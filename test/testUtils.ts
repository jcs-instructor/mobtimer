import { MobSocketClient } from "../src/client/mobSocketClient";
import { port } from "./mobClientServer.test";
import { WebSocket } from "ws";

export async function openSocket() {
  const socket = new MobSocketClient(`ws://localhost:${port}`);
  await waitForSocketState(socket, socket.OPEN);
  return socket;
}

/**
 * Forces a process to wait until the socket's `readyState` becomes the specified value.
 * @param socket The socket whose `readyState` is being watched
 * @param state The desired `readyState` for the socket
 */

export function waitForSocketState(
  socket: WebSocket,
  state: number
): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve();
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    });
  });
}
