import WebSocket from "ws";
import { startMobServer } from "./mobWebSocketUtils";
import * as MobMessages from "./mobWebMessages";
import { MobTimer, Status } from "./mobTimer";
import { closeSocket, openSocket, sendMessage } from "./testUtils";

export const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
  let server;

  beforeAll(async () => {
    server = await startMobServer(port);
  });

  afterAll(() => server.close());

  test("Create mob", async () => {
    const socket = await joinMob("awesome-team");
    await closeSocket(socket);
    expect(socket.getLastJson()).toEqual(new MobTimer("awesome-team").state);
  });

  test("Create 2 mobs", async () => {
    const socket = await joinMob("awesome-team");
    const socket2 = await joinMob("good-team");

    await closeSocket(socket);
    await closeSocket(socket2);

    expect(socket.getLastJson()).toEqual(new MobTimer("awesome-team").state);
    expect(socket2.getLastJson()).toEqual(new MobTimer("good-team").state);
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
async function joinMob(mobName: string) {
  const socket = await openSocket();
  const testMessage = MobMessages.joinMessage(mobName);
  socket.send(testMessage);
  return socket;
}

