import { waitForSocketState } from "./webSocketUtils";
import { MobWebTestSocket } from "./mobWebTestSocket";
import { port } from "./mobWebSocketServer.test";

// todo: remove
export async function sendMessage(message: string) {
  const socket = await openSocket();
  socket.send(message);
  await closeSocket(socket);
  return socket;
}

export async function openSocket() {
  const socket = new MobWebTestSocket(`ws://localhost:${port}`);
  await waitForSocketState(socket, socket.OPEN);
  return socket;
}
