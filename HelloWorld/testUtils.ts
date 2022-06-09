import { waitForSocketState } from "./webSocketUtils";
import { MobWebTestSocket } from "./mobWebTestSocket";
import { port } from "./mobWebSocketServer.test";

export async function sendMessage(message: string) {
  const socket = await openSocket();
  let responseMessage: string;
  socket.send(message);
  socket.close();
  await waitForSocketState(socket, socket.CLOSED);
  responseMessage = socket.receivedMessages[0];
  const parsedMessage = JSON.parse(responseMessage);
  return { socket, parsedMessage };
}
async function openSocket() {
  const socket = new MobWebTestSocket(`ws://localhost:${port}`);
  await waitForSocketState(socket, socket.OPEN);
  return socket;
}

