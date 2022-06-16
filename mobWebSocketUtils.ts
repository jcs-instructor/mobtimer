import * as http from "http";
import WebSocket, { Server } from "ws";
import { MobWebSocket } from "./mobWebSocket";
import { MobTimer } from "./mobTimer";
import { TimeUtil as TimeUtils } from "./timeUtils";
import { Status } from "./status";

const _mobs: Map<string, MobTimer> = new Map();

function delaySeconds(
  seconds: number,
  mobTimer: MobTimer,
  server: http.Server
) {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (mobTimer.status === Status.Ready) {
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

function _processMessage(
  parsedMessage: any,
  socket: MobWebSocket,
  wss: Server
) {
  let mobName: string;
  let mobTimer: MobTimer | undefined;

  if (parsedMessage.action === "join") {
    mobName = parsedMessage.mobName;
    mobTimer = _getOrRegisterMob(mobName);
  } else {
    mobName = socket.mobName;
    mobTimer = _getMob(mobName);
  }

  if (!mobTimer) {
    return;
  }

  switch (parsedMessage.action) {
    case "join": {
      socket.mobName = mobName;
      break;
    }
    case "update": {
      // todo: maybe: mobTimer.state = { ...mobTimer.state, ...parsedMessage.value };
      mobTimer.durationMinutes =
        parsedMessage.value.durationMinutes || mobTimer.durationMinutes;
      break;
    }
    case "start": {
      mobTimer.start();
      delaySeconds(
        TimeUtils.minutesToSeconds(mobTimer.durationMinutes),
        mobTimer,
        wss
      );
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

/**
 * Creates a WebSocket server from a Node http server. The server must
 * be started externally.
 * @param server The http server from which to create the WebSocket server
 */
export function createMobWebSocketServer(server: http.Server): void {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function (webSocket: MobWebSocket) {
    webSocket.on("message", function (message) {
      let isString = typeof message == "string";
      let textMessage: string = (
        isString ? message : message.toString()
      ) as string;
      let mobName: string;
      const parsedMessage = JSON.parse(textMessage);
      mobName = JSON.parse(textMessage).mobName;
      let mobTimer = _processMessage(parsedMessage, webSocket, wss);
      if (!mobTimer) {
        return;
      }
      let sendMessage = JSON.stringify(mobTimer.state);
      webSocket.send(sendMessage);
    });
  });
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
