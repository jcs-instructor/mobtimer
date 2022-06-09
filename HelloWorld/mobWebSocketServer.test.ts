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
    const parsedMessage = await sendMessage(testMessage);
    expect(parsedMessage).toEqual(new MobTimer("awesome-team").state);
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

  test("Pause timer", async () => {
    debugger;
    const testMessage = MobMessages.joinMessage("awesome-team");
    sendMessage(testMessage);
    const pauseJson = MobMessages.pauseMessage();
    console.log("a");
    const parsedMessage = await sendMessage(pauseJson);
    console.log("b");
  });
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
  console.log("- 1 -");
  const client = new MobWebTestSocket(`ws://localhost:${port}`);
  console.log("- 2 -");
  await waitForSocketState(client, client.OPEN);
  console.log("- 3 -");
  let responseMessage: string;
  client.send(message);
  client.close();
  console.log("- 4 -");
  await waitForSocketState(client, client.CLOSED);
  responseMessage = client.receivedMessages[0];
  console.log("- 5 -", responseMessage, client.receivedMessages);
  const parsedMessage = JSON.parse(responseMessage);
  console.log("- 6 -");
  return parsedMessage;
}
