// todo: this file is called "testUtils" but if used for non-test code also, reconsider name

import { MobSocketClient } from "./mobSocketClient";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// todo: reconsider using JEST_WORKER_ID in production code; this is a duplicate of the port in mobClientServer.test.ts
const port = 4000 + Number(process.env.JEST_WORKER_ID);

export async function openSocket() {
  const socket = new MobSocketClient(`ws://localhost:${port}`);
  await waitForSocketState(socket.webSocket, socket.webSocket.OPEN);
  return socket;
}

/**
 * Forces a process to wait until the socket's `readyState` becomes the specified value.
 * @param socket The socket whose `readyState` is being watched
 * @param state The desired `readyState` for the socket
 */

export function waitForSocketState(
  socket: W3CWebSocket,
  state: number
): Promise<void> {
  return new Promise(function (resolve) {
    const timeout = setTimeout(function () {
      if (socket.readyState === state) {
        resolve();
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    });
    timeout.unref();
  });
}