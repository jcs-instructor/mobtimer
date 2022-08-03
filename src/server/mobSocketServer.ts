import * as http from "http";
import WebSocket from "ws";
import { MobTimer } from "../mobTimer";
import { Action } from "./action";
import {
  MobTimerRequest,
  JoinRequest,
  UpdateRequest,
} from "./mobTimerRequests";
import express from "express";
import * as path from "path";

export async function startMobServer(
  port: number
): Promise<{ httpServer: http.Server; wss: WebSocket.Server }> {
  const server = http.createServer();
  const wss = addMobListeners(server);
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

  addMobListeners(server);
}

type Room = { mobTimer: MobTimer; sockets: Set<WebSocket> };

const _mapOfMobNameToRoom: Map<string, Room> = new Map();
const _mapOfSocketToMobName: Map<WebSocket, string> = new Map();

export function resetRooms() {
  _mapOfMobNameToRoom.clear();
  _mapOfSocketToMobName.clear();
}

function _getMobTimer(mobName: string): MobTimer | undefined {
  return _mapOfMobNameToRoom.get(mobName)?.mobTimer;
}

function _getSocketsForSingleMob(mobName: string): Set<WebSocket> | undefined {
  return _mapOfMobNameToRoom.get(mobName)?.sockets;
}

function _getOrRegisterRoom(
  wss: WebSocket.Server,
  mobName: string,
  socket: WebSocket
) {
  let mobTimer = _getMobTimer(mobName);
  if (!mobTimer) {
    mobTimer = new MobTimer(mobName);
    mobTimer.expireFunc = () =>
      broadcastToClients(wss, mobTimer as MobTimer, Action.Expired);
    _mapOfMobNameToRoom.set(mobName, { mobTimer: mobTimer, sockets: new Set<WebSocket> });
  }
  _mapOfMobNameToRoom.get(mobName)?.sockets.add(socket);

  _mapOfSocketToMobName.set(socket, mobName);
  return mobTimer;
}

function _processRequest(
  wss: WebSocket.Server,
  parsedRequest: MobTimerRequest,
  socket: WebSocket
) {
  let mobName: string | undefined;
  let mobTimer: MobTimer | undefined;

  if (parsedRequest.action === Action.Join) {
    const joinRequest = parsedRequest as JoinRequest;
    mobName = joinRequest.mobName;
    mobTimer = _getOrRegisterRoom(wss, mobName, socket);
  } else {
    mobName = _mapOfSocketToMobName.get(socket) || ""; // socket.mobName no longer exists, so get the mob name from the socket another way
    mobTimer = _getMobTimer(mobName);
  }

  if (!mobTimer) {
    return;
  }

  switch (parsedRequest.action) {
    case Action.Join: {
      _mapOfSocketToMobName.set(socket, mobName);
      break;
    }
    case "update": {
      // todo: maybe: mobTimer.state = { ...mobTimer.state, ...parsedMessage.value };
      const updateRequest = parsedRequest as UpdateRequest;
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

function broadcast(mobName: string, messageToClients: string) {
  const sockets = _getSocketsForSingleMob(mobName);
  if (!sockets) {
    return;
  }
  sockets.forEach((socketClient: WebSocket) => {
    socketClient.send(messageToClients);
  });
}

/**
 * Creates a WebSocket server from a Node http server. The server must
 * be started externally.
 * @param server The http server from which to create the WebSocket server
 */
function addMobListeners(server: http.Server): WebSocket.Server {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function (webSocket: WebSocket) {
    webSocket.on("message", function (request) {
      let requestString: string = requestToString(request);
      let parsedRequest: MobTimerRequest;
      try {
        parsedRequest = JSON.parse(requestString) as MobTimerRequest;
      } catch (e) {
        const errorResponse = JSON.stringify({
          actionInfo: { action: Action.InvalidRequestError },
        });
        webSocket.send(errorResponse);
        return;
      }
      let mobTimer = _processRequest(wss, parsedRequest, webSocket);
      if (!mobTimer) {
        return;
      }
      broadcastToClients(wss, mobTimer, parsedRequest.action); // todo consider moving mobName up a level
    });
  });
  return wss;
}

function broadcastToClients(
  wss: WebSocket.Server<WebSocket.WebSocket>,
  mobTimer: MobTimer,
  action: Action
) {
  let response = JSON.stringify({
    actionInfo: { action: action },
    mobState: mobTimer.state,
  });
  broadcast(mobTimer.state.mobName, response);
}

function requestToString(request: WebSocket.RawData) {
  let isString = typeof request == "string";
  let requestString: string = (
    isString ? request : request.toString()
  ) as string;
  return requestString;
}
