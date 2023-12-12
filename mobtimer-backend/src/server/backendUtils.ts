import * as http from "http";
import WebSocket from "ws";
import { MobTimer, Action, MobTimerRequests, MobTimerResponses, Controller } from "../mobtimer-api";
import express from "express";
import * as path from "path";
import { RoomManager } from "./roomManager";
import { Broadcaster } from "./broadcaster";
import { randomUUID } from "crypto";
import { WebSocketWithId } from "./webSocketWithId";

export class backendUtils {
  static async startMobServer(
    port: number,
  ): Promise<{ httpServer: http.Server; wss: WebSocket.Server }> {
    const server = http.createServer();
    const wss = backendUtils._addMobListeners(server);
    return new Promise((resolve) => {
      server.listen(port, () => resolve({ httpServer: server, wss }));
    });
  }

  static renderHomePage(port: number) {
    const app = express();

    // View engine setup
    app.set("view engine", "ejs");

    // Folder configuration
    app.use(express.static("public"));
    console.log("dirname", __dirname);
    app.set("views", path.join(__dirname, "views"));

    // Without middleware
    app.get("/", function (_req: any, res: any) {
      // Rendering home.ejs page
      res.render("home");
    });

    const server = app.listen(port, function () {
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}] Server listening on PORT ${port}`);
    });

    backendUtils._addMobListeners(server);
  }

  private static _processMobTimerRequest(
    parsedRequest: MobTimerRequests.MobTimerRequest,
    socket: any // WebSocket
  ) 
  {
    let mobName: string | undefined;
    let mobTimer: MobTimer | undefined;

    if (parsedRequest.action === Action.Join) {
      const joinRequest = parsedRequest as MobTimerRequests.JoinRequest;
      mobName = joinRequest.mobName;
      mobTimer = RoomManager.getOrRegisterRoom(mobName, socket);
    } else {
      mobTimer = RoomManager.getMobTimerFromSocket(socket);
    }      
    console.log("mobTimer in _process", mobTimer?.state?.mobName)
      

    if (!mobTimer) {
      return;
    }

    switch (parsedRequest.action) {
      case Action.Echo: {
        break;
      }

      case Action.Join: {
        // todo: this is taken care of above; maybe it could be done here
        break;
      }
      case Action.Update: {
        // todo: maybe: mobTimer.state = { ...mobTimer.state, ...parsedMessage.value };
        const updateRequest = parsedRequest as MobTimerRequests.UpdateRequest;
        mobTimer.durationMinutes =
          updateRequest.value.durationMinutes || mobTimer.durationMinutes;
        break;
      }
      
      case Action.AddParticipant: {
        const addParticipantRequest =
          parsedRequest as MobTimerRequests.AddParticipantRequest;
        mobTimer.addParticipant(addParticipantRequest.name);
        break;
      }
      case Action.RotateParticipants: {
        mobTimer.rotateParticipants();
        break;
      }
      case Action.ShuffleParticipants: {
        mobTimer.shuffleParticipants();
        break;
      }
      case Action.EditParticipants: {
        const editParticipantsRequest =
          parsedRequest as MobTimerRequests.EditParticipantsRequest;
        mobTimer.editParticipants(editParticipantsRequest.participants);
        break;
      }
      case Action.EditRoles: {
        const editRolesRequest =
          parsedRequest as MobTimerRequests.EditRolesRequest;
        mobTimer.editRoles(editRolesRequest.roles);
        break;
      }
      case Action.Start: {
        mobTimer.start();
        break;
      }
      case Action.Pause: {
        mobTimer.pause();
        break;
      }
      case Action.Reset: {
        mobTimer.reset();
        break;
      }
    }

    return mobTimer;
  }

  /**
   * Creates a WebSocket server from a Node http server. The server must
   * be started externally.
   * @param server The http server from which to create the WebSocket server
   */

  private static _addMobListeners(
    server: http.Server
  ): WebSocket.Server {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", async function (webSocket: WebSocketWithId) {
      const currentTime = new Date();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      const ms = currentTime.getMilliseconds();
      webSocket.id = `${Object.keys(RoomManager.roomsBySocketIdMap).length}:${minutes}:${seconds}.${ms}}`;
      console.log("connecting websocket", webSocket.id, Object.keys(RoomManager.roomsBySocketIdMap));
      console.log()
      webSocket.on("message", function (request) {
        let requestString: string = backendUtils._requestToString(request);
        backendUtils.processRequest(requestString, webSocket);
      });
    });
    return wss;
  }

  static processRequest(requestString: string, webSocket: WebSocketWithId) { 
    console.log("requestString", requestString, webSocket.id)
    let response = backendUtils.getResponse(requestString, webSocket);
    console.log("response mob", (response as any)?.mobState?.mobName)
    backendUtils._sendResponse(response, webSocket);
  }

  private static _sendResponse(response: MobTimerResponses.MobTimerResponse | undefined, webSocket: any) {
    const successfulResponse = response as MobTimerResponses.SuccessfulResponse;
    const mobName = successfulResponse?.mobState?.mobName;

    // Send the response. Either:
    // - Broadcast to all clients if we have a successful MobTimer response, or
    // - Send the response only to the client that made the request (e.g., when it's an error or echo response).
    if (successfulResponse?.mobState) {
      // Broadcast:
      Broadcaster.broadcastResponseToMob(successfulResponse, mobName); // todo: RoomManager.broadcast(message)) // todo consider moving mobName up a level
    } else if (response) {
      // Send only to requesting client:
      Broadcaster.sendToClient(webSocket, JSON.stringify(response));
    }
  }

  static getResponse(requestString: string, webSocket: any) {
    //WebSocket
    let isMobTimerRequest = false;
    let response: MobTimerResponses.MobTimerResponse | undefined;
    let parsedRequest: MobTimerRequests.MobTimerRequest | undefined;

    // Validate and parse the request
    try {
      parsedRequest = JSON.parse(
        requestString
      ) as MobTimerRequests.MobTimerRequest;
      isMobTimerRequest = true;
    } catch (e) {
      const errorResponse = {
        actionInfo: { action: Action.InvalidRequestError },
      } as MobTimerResponses.ErrorResponse;
      response = errorResponse;
    }

    // Check if it's an echo request (echo requests don't use the mobTimer)
    if (parsedRequest && parsedRequest.action === Action.Echo) {
      const echoResponse = {
        actionInfo: { action: Action.Echo },
      } as MobTimerResponses.EchoResponse;
      response = echoResponse;
    }

    let mobTimer: MobTimer | undefined;
    if (isMobTimerRequest && parsedRequest) {
      console.log("parsedRequest", parsedRequest, webSocket.id)
      mobTimer = backendUtils._processMobTimerRequest(parsedRequest, webSocket);
      console.log("mobTimer", mobTimer?.state?.mobName)
      if (mobTimer) {
        response = {
          actionInfo: { action: parsedRequest.action },
          mobState: mobTimer.state,
          //logInfo: mobTimer.getLogInfo(),
        } as MobTimerResponses.SuccessfulResponse;
      }
    }

    return response;
  }

  // todo: consider:
  // function _initialize(webSocket: WebSocket) {
  //   webSocket.send(
  //     JSON.stringify({
  //       type: "settings:update",
  //       settings: { mobOrder: "Navigator,Driver", duration: 300000 },
  //     })
  //   );
  //   webSocket.send(JSON.stringify({ type: "mob:update", mob: [] }));
  //   webSocket.send(JSON.stringify({ type: "goals:update", goals: [] }));
  // }

  private static _requestToString(request: WebSocket.RawData) {
    let isString = typeof request == "string";
    let requestString: string = (
      isString ? request : request.toString()
    ) as string;
    return requestString;
  }
}
