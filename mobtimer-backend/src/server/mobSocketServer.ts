import * as http from "http";
import WebSocket from "ws";
import { MobTimer } from "../mobTimer";
import {
  Action,
  mobTimerRequests
} from "mobtimer-api";
import express from "express";
import * as path from "path";
import { RoomManager } from "./roomManager";

export async function startMobServer(
  port: number
): Promise<{ httpServer: http.Server; wss: WebSocket.Server }> {
  const server = http.createServer();
  const wss = _addMobListeners(server);
  return new Promise((resolve) => {
    server.listen(port, () => resolve({ httpServer: server, wss }));
  });
}

export function renderHomePage(port: number) {
  const app = express();

  // View engine setup
  app.set("view engine", "ejs");

  // Folder configuration
  app.use(express.static("public"));
  app.set("views", path.join(__dirname, "views"));

  // Without middleware
  app.get("/", function (req: any, res: any) {
    console.log(req);

    // Rendering home.ejs page
    res.render("home");
  });

  const server = app.listen(port, function () {
    console.log("Server listening on PORT", port);
  });

  _addMobListeners(server);
}

function _processRequest(
  wss: WebSocket.Server,
  parsedRequest: mobTimerRequests.MobTimerRequest,
  socket: WebSocket
) {
  let mobName: string | undefined;
  let mobTimer: MobTimer | undefined;

  if (parsedRequest.action === Action.Join) {
    const joinRequest = parsedRequest as mobTimerRequests.JoinRequest;
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
    case "update": {
      // todo: maybe: mobTimer.state = { ...mobTimer.state, ...parsedMessage.value };
      const updateRequest = parsedRequest as mobTimerRequests.UpdateRequest;
      mobTimer.durationMinutes =
        updateRequest.value.durationMinutes || mobTimer.durationMinutes;
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
    case Action.Resume: {
      mobTimer.resume();
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
function _addMobListeners(server: http.Server): WebSocket.Server {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function (webSocket: WebSocket) {
    webSocket.on("message", function (request) {
      let requestString: string = _requestToString(request);
      let parsedRequest: mobTimerRequests.MobTimerRequest;
      try {
        parsedRequest = JSON.parse(requestString) as mobTimerRequests.MobTimerRequest;
      } catch (e) {
        const errorResponse = JSON.stringify({
          actionInfo: { action: Action.InvalidRequestError },
        });
        webSocket.send(errorResponse);
        return;
      }
      if (parsedRequest.action === Action.Echo) {
        const echoResponse = JSON.stringify({
          actionInfo: { action: Action.Echo },
        });
        webSocket.send(echoResponse);
        return;
      }
      let mobTimer = _processRequest(wss, parsedRequest, webSocket);
      if (!mobTimer) {
        return;
      }
      RoomManager.broadcastToMob(
        mobTimer,
        parsedRequest.action
      ); // todo consider moving mobName up a level
    });
  });
  return wss;
}

function _requestToString(request: WebSocket.RawData) {
  let isString = typeof request == "string";
  let requestString: string = (
    isString ? request : request.toString()
  ) as string;
  return requestString;
}
