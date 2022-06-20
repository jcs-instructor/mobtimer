import * as http from "http";
import WebSocket, { Server } from "ws";
import { MobWebSocket } from "./mobWebSocket";
import { MobTimer } from "./mobTimer";
import { TimeUtils } from "./timeUtils";
import { Status } from "./status";
import {
  MobTimerRequest,
  JoinRequest,
  UpdateRequest,
} from "./mobTimerRequests";

// to do - extract things related to _mobs or wss to a class in a separate file

const _mobs: Map<string, MobTimer> = new Map();
function delaySeconds(
  seconds: number,
  mobTimer: MobTimer,
  server: http.Server
) {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (mobTimer.status === Status.Ready) {
        //server. //server.sendReadyMessage();
        // server.sendReadyMessage();
      }

      console.log("here");
    }, seconds * 1000)
  );
}

function _getMob(mobName: string): MobTimer | undefined {
  return _mobs.get(mobName);
}

function _getOrRegisterMob(mobName: string) {
  let mobTimer = _getMob(mobName);
  if (!mobTimer) {
    mobTimer = new MobTimer(mobName);
    _mobs.set(mobName, mobTimer);
  }
  return mobTimer;
}

function _processRequest(parsedRequest: MobTimerRequest, socket: MobWebSocket) {
  let mobName: string | undefined;
  let mobTimer: MobTimer | undefined;

  if (parsedRequest.action === "join") {
    const joinRequest = parsedRequest as JoinRequest;
    mobName = joinRequest.mobName;
    mobTimer = _getOrRegisterMob(mobName);
  } else {
    mobName = socket.mobName;
    mobTimer = _getMob(mobName);
  }

  if (!mobTimer) {
    return;
  }

  switch (parsedRequest.action) {
    case "join": {
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
    case "start": {
      mobTimer.start();
      // delaySeconds(
      //   TimeUtils.minutesToSeconds(mobTimer.durationMinutes),
      //   mobTimer,
      //   wss
      // );
      break;
    }
    case "pause": {
      mobTimer.pause();
      break;
    }
    case "resume": {
      mobTimer.resume();
      break;
    }
  }

  return mobTimer;
}

export function broadcast(
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
export function createMobWebSocketServer(server: http.Server): void {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function (webSocket: MobWebSocket) {
    webSocket.on("message", function (request) {
      let requestString: string = requestToString(request);
      const parsedRequest = JSON.parse(requestString) as MobTimerRequest;
      let mobTimer = _processRequest(parsedRequest, webSocket);
      if (!mobTimer) {
        return;
      }
      let response = JSON.stringify(mobTimer.state);
      broadcast(wss, mobTimer.state.mobName, response); // todo consider moving mobName up a level
    });
  });
}

function requestToString(request: WebSocket.RawData) {
  let isString = typeof request == "string";
  let requestString: string = (
    isString ? request : request.toString()
  ) as string;
  return requestString;
}

/**
 * Creates and starts a WebSocket server from a simple http server for testing purposes.
 * @param port Port for the server to listen on
 * @returns The created server
 */
export function startMobServer(port: number): Promise<http.Server> {
  const server = http.createServer();
  createMobWebSocketServer(server);

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}
