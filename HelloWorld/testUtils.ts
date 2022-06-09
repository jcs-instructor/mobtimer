import { waitForSocketState } from "./webSocketUtils";
import { MobWebTestSocket } from "./mobWebTestSocket";
import { port } from "./mobWebSocketServer.test";

export async function openSocket() {
  const socket = new MobWebTestSocket(`ws://localhost:${port}`);
  await waitForSocketState(socket, socket.OPEN);
  return socket;
}
