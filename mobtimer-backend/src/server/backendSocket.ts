import * as http from "http";
import WebSocket from "ws";
import {
  MobTimer,
  WSFrontendSocket,
} from "mobtimer-api";
import { Action, MobTimerRequests, MobTimerResponses } from "mobtimer-api";
import express from "express";
import * as path from "path";
import { RoomManager } from "./roomManager";
import { Heartbeat } from "./heartbeat";
import { Broadcaster } from "./broadcaster";

const defaultHeartbeatValues = { heartbeatDurationMinutes : Number.parseInt(
      process.env.HEARTBEAT_DURATION_MINUTES || ""
    ) || 12, // e.g., render.com has a 15 minute timeout, so 12 minutes is a safe value
    heartbeatMaxInactivityMinutes: Number.parseInt(
      process.env.HEARTBEAT_MAX_INACTIVITY_MINUTES || ""
    ) || 120 // e.g., people mobbing together with a break of up to 2 hours won't experience an inactivity timeout
}

export class backendUtils {
 static async startMobServer(
  port: number,
  onHeartbeatFunc = () => {},
  {
    heartbeatDurationMinutes,
    heartbeatMaxInactivityMinutes
  } = defaultHeartbeatValues
): Promise<{ httpServer: http.Server; wss: WebSocket.Server }> {
  const server = http.createServer();
  const wss = _addMobListeners(server, onHeartbeatFunc,   {
    heartbeatDurationMinutes,
    heartbeatMaxInactivityMinutes
  } 
  );
  return new Promise((resolve) => {
    server.listen(port, () => resolve({ httpServer: server, wss }));
  });
}
}

export function renderHomePage(port: number) {
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

  _addMobListeners(server);
}

function _processMobTimerRequest(
  parsedRequest: MobTimerRequests.MobTimerRequest,
  socket: any // WebSocket
) {
  let mobName: string | undefined;
  let mobTimer: MobTimer | undefined;

  if (parsedRequest.action === Action.Join) {
    const joinRequest = parsedRequest as MobTimerRequests.JoinRequest;
    mobName = joinRequest.mobName;
    mobTimer = RoomManager.getOrRegisterRoom(mobName, socket);
  } else {
    mobTimer = RoomManager.getMobTimerFromSocket(socket);
  }

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
function _addMobListeners(
  server: http.Server,
  onHeartbeatFunc = () => {},
{
    heartbeatDurationMinutes,
    heartbeatMaxInactivityMinutes
} = defaultHeartbeatValues
): WebSocket.Server {
  const wss = new WebSocket.Server({ server });
  const heartbeat = new Heartbeat(heartbeatDurationMinutes, heartbeatMaxInactivityMinutes, () => {
    console.log("Heartbeat: " + new Date().toLocaleTimeString());
    onHeartbeatFunc();
  });
  heartbeat.start();

  wss.on("connection", async function (webSocket: WebSocket) {
    // 2nd parameter for mrozbarry, request2: any
    // const url = new URL(request2.url, `http://${request2.headers.host}`);
    // let mobName = url.pathname.replace("/", "");
    // if (mobName) {
    //   _initialize(webSocket);
    // }

    webSocket.on("message", function (request) {
      // TODO: when coming from vscode extension, mobname is in the wss url, e.g., wss://localhost:3000/mymob
      // SAMPLE CODE FROM MROZZBARRY
      //    wss.on('connection', async (client, request) => {
      // const url = new URL(request.url, `http://${request.headers.host}`);
      // const timerId = url.pathname.replace('/', '');
      // log('websocket.connect', timerId);
      // client.on('close', () => {
      //   log('websocket.disconnect', timerId);
      // });

      heartbeat.restart();

      let requestString: string = _requestToString(request);

      // Process raw request.
      let response = processRawRequest(requestString, webSocket); 

      // Send a response. Either:
      // - Broadcast to all clients if we have a successful MobTimer response, or
      // - Send the response only to the client that made the request (e.g., when it's an error or echo response).
      const successfulResponse = response as MobTimerResponses.SuccessfulResponse;
      const mobName = successfulResponse?.mobState?.mobName;
      if (successfulResponse?.mobState) {
        // Broadcast:
        Broadcaster.broadcastResponseToMob(successfulResponse, mobName); // todo: RoomManager.broadcast(message)) // todo consider moving mobName up a level        
      } else if (response) {
        // Send only to requesting client:
        sendToSocket(webSocket, response);        
      } 
    });
  });
  return wss;
}

export function processRawRequest(requestString: string, webSocket: any ) { //WebSocket
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
    mobTimer = _processMobTimerRequest(parsedRequest, webSocket);
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

async function sendToSocket(
  webSocket: WebSocket,
  request: MobTimerResponses.MobTimerResponse
) {
  const webSocketWrapper = new WSFrontendSocket("", webSocket);
  // await FrontendMobSocket.waitForSocketState(
  //   webSocketWrapper,
  //   webSocketWrapper.OPEN_CODE
  // );
  console.log("state: " + webSocketWrapper.socketState);
  webSocketWrapper.sendToServer(JSON.stringify(request));
}

function _requestToString(request: WebSocket.RawData) {
  let isString = typeof request == "string";
  let requestString: string = (
    isString ? request : request.toString()
  ) as string;
  return requestString;
}
