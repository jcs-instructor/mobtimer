// todo: this file is called "testUtils" but if used for non-test code also, reconsider name

import { MobTimerResponse } from "./mobTimerResponse";
import { MobSocketClient } from "./mobSocketClient";

// todo: reconsider using JEST_WORKER_ID in production code; this is a duplicate of the port in mobClientServer.test.ts
const port = 4000 + Number(process.env.JEST_WORKER_ID);

/**
 * Forces a process to wait until the socket's `readyState` becomes the specified value.
 * @param socket The socket whose `readyState` is being watched
 * @param state The desired `readyState` for the socket
 */

export function waitForSocketState(
  socket: { readyState: number },
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
    console.log("at end of testUtils.waitForSocketState")
    // todo: timeout.unref() fails when running from frontend; why?
    // timeout.unref();
  });
}

export async function waitForLastResponse(socket: MobSocketClient) {
  await socket.sendEchoRequest();
  await waitForEcho(socket);
}

async function waitForEcho(
  socket: MobSocketClient
): Promise<void> {
  return new Promise(function (resolve) {
    const timeout = setTimeout(function () {
      if (socket.echoReceived) {
        resolve();
      }
      waitForEcho(socket).then(resolve);
    }, 10);
    timeout.unref();
  });
}

export function convertToMobTimerResponse(response: string): MobTimerResponse {
  return JSON.parse(response) as MobTimerResponse;
}

