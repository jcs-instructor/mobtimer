import * as http from "http";
import WebSocket, { Server } from "ws";
import { MobTimer } from "../mobTimer";
import { Action } from "./action";
import {
  MobTimerRequest,
  JoinRequest,
  UpdateRequest,
} from "./mobTimerRequests";
import express from "express";
import * as path from "path";

export async function startMobServer(port: number): Promise<http.Server> {
  const server = http.createServer();
  addMobListeners(server);
  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

export function renderHomePage(port: number) {
  const app = express();

  // View engine setup
  // todo: wrong path - fix this
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

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

// private class
class MobWebSocket extends WebSocket {
  constructor(url: string) {
    super(url);
  }

  private _mobName = "";
  public get mobName(): string {
    return this._mobName;
  }
  public set mobName(value: string) {
    this._mobName = value;
  }
}

// todo: consider mapping to both mob timer and sockets associated with given mob name,
// which could allow us to get rid of the private MobWebSocket class (?)
const _mobs: Map<string, MobTimer> = new Map();

export function resetMobs() {
  _mobs.clear();
}

function _getMob(mobName: string): MobTimer | undefined {
  return _mobs.get(mobName);
}

function _getOrRegisterMob(wss: WebSocket.Server, mobName: string) {
  let mobTimer = _getMob(mobName);
  if (!mobTimer) {
    mobTimer = new MobTimer(mobName);
    mobTimer.expireFunc = () =>
      broadcastToClients(wss, mobTimer as MobTimer, Action.Expired);
    _mobs.set(mobName, mobTimer);
  }
  return mobTimer;
}

function _processRequest(
  wss: WebSocket.Server,
  parsedRequest: MobTimerRequest,
  socket: MobWebSocket
) {
  let mobName: string | undefined;
  let mobTimer: MobTimer | undefined;

  if (parsedRequest.action === Action.Join) {
    const joinRequest = parsedRequest as JoinRequest;
    mobName = joinRequest.mobName;
    mobTimer = _getOrRegisterMob(wss, mobName);
  } else {
    mobName = socket.mobName;
    mobTimer = _getMob(mobName);
  }

  if (!mobTimer) {
    return;
  }

  switch (parsedRequest.action) {
    case Action.Join: {
      socket.mobName = mobName;
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

function broadcast(
  wss: WebSocket.Server,
  mobName: string,
  messageToClients: string
) {
  wss.clients.forEach((socketClient: WebSocket) => {
    const mobSocketClient = socketClient as MobWebSocket;
    if (mobSocketClient.mobName === mobName) {
      mobSocketClient.send(messageToClients);
    }
  });
}

/**
 * Creates a WebSocket server from a Node http server. The server must
 * be started externally.
 * @param server The http server from which to create the WebSocket server
 */
function addMobListeners(server: http.Server): void {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function (webSocket: MobWebSocket) {
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
  broadcast(wss, mobTimer.state.mobName, response);
}

function requestToString(request: WebSocket.RawData) {
  let isString = typeof request == "string";
  let requestString: string = (
    isString ? request : request.toString()
  ) as string;
  return requestString;
}
