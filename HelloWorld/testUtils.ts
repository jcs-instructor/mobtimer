import { waitForSocketState } from "./webSocketUtils";
import { MobWebTestSocket } from "./mobWebTestSocket";
import { port } from "./mobWebSocketServer.test";

export async function sendMessage(message: string) {
  const socket = await openSocket();
  socket.send(message);
  await closeSocket(socket);
  return socket;
}

async function closeSocket(socket: MobWebTestSocket) {
  socket.close();
  await waitForSocketState(socket, socket.CLOSED);
}

async function openSocket() {
  const socket = new MobWebTestSocket(`ws://localhost:${port}`);
  await waitForSocketState(socket, socket.OPEN);
  return socket;
}

