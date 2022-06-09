import WebSocket from "ws";
import { startMobServer } from "./mobWebSocketUtils";
import { waitForSocketState } from "./webSocketUtils";
import * as MobMessages from "./mobWebMessages";
import { MobTimer, Status } from "./mobTimer";
import { MobWebTestSocket } from "./mobWebTestSocket";

const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
  let server;

  beforeAll(async () => {
    server = await startMobServer(port);
  });

  afterAll(() => server.close());

  test("Create mob", async () => {
    const testMessage = MobMessages.joinMessage("awesome-team");
    const { socket, parsedMessage } = await sendMessage(testMessage);
    expect(JSON.parse(socket.receivedMessages[0])).toEqual(new MobTimer("awesome-team").state);
  });

  test("Create 2 mobs", async () => {
    const testMessage = MobMessages.joinMessage("awesome-team");
    const parsedMessage = await sendMessage(testMessage);

    const testMessage2 = MobMessages.joinMessage("good-team");
    const parsedMessage2 = await sendMessage(testMessage2);

    // Assertions
    expect(parsedMessage).toEqual(new MobTimer("awesome-team").state);
    expect(parsedMessage2).toEqual(new MobTimer("good-team").state);
  });

  // test("Pause timer", async () => {
  //   const testMessage = MobMessages.joinMessage("awesome-team");
  //   sendMessage(testMessage);
  //   const pauseJson = MobMessages.pauseMessage();
  //   const parsedMessage = await sendMessage(pauseJson);
  // });
  //   test("Pause timer", async () => {
  //     const joinMessage = MobMessages.joinMessage("awesome-team");
  //     await sendMessage(joinMessage);
  //     const pauseMessage2 = MobMessages.pauseMessage();
  //     const parsedMessage = await sendMessage(pauseMessage2);
  //     expect(parsedMessage.status).toEqual(Status.Paused);
  //   });

  // todo: add tests for update and start messages
});

async function sendMessage(message: string) {
  const socket = new MobWebTestSocket(`ws://localhost:${port}`);
  await waitForSocketState(socket, socket.OPEN);
  let responseMessage: string;
  socket.send(message);
  socket.close();
  await waitForSocketState(socket, socket.CLOSED);
  responseMessage = socket.receivedMessages[0];
  const parsedMessage = JSON.parse(responseMessage);
  return { socket, parsedMessage };
}
