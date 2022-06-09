import WebSocket from "ws";
import { startMobServer } from "./mobWebSocketUtils";
import * as MobMessages from "./mobWebMessages";
import { MobTimer } from "./mobTimer";
import { Status } from "./status";
import { openSocket } from "./testUtils";

export const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
  let server;

  beforeAll(async () => {
    server = await startMobServer(port);
  });

  afterAll(() => server.close());

  test("Create mob", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.closeSocket();
    expect(socket.getLastJson()).toEqual(new MobTimer("awesome-team").state);
  });

  test("Create 2 mobs", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");

    const socket2 = await openSocket();
    await socket2.joinMob("good-team");

    await socket.closeSocket();
    await socket2.closeSocket();

    expect(socket.getLastJson()).toEqual(new MobTimer("awesome-team").state);
    expect(socket2.getLastJson()).toEqual(new MobTimer("good-team").state);
  });

  test("Create 2 mobs", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");

    const socket2 = await openSocket();
    await socket2.joinMob("good-team");
    await socket2.send(MobMessages.updateMessage(17));

    await socket.closeSocket();
    await socket2.closeSocket();

    expect(socket.getLastJson().durationMinutes).toEqual(
      new MobTimer("awesome-team").state.durationMinutes
    );
    expect(socket2.getLastJson().durationMinutes).toEqual(17);
  });

  test("Start timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await await socket.closeSocket();
    expect(socket.getLastJson().status).toEqual(Status.Running);
  });

  test("Pause timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.send(MobMessages.pauseMessage());
    await await socket.closeSocket();
    expect(socket.getLastJson().status).toEqual(Status.Paused);
  });

  test("Resume timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.send(MobMessages.pauseMessage());
    await socket.send(MobMessages.resumeMessage());
    await await socket.closeSocket();
    expect(socket.getLastJson().status).toEqual(Status.Resumed);
  });

  test("Update timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.send(MobMessages.updateMessage(40));
    await await socket.closeSocket();
    expect(socket.getLastJson().durationMinutes).toEqual(40);
  });
});
