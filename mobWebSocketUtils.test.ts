import WebSocket from "ws";
import { startMobServer } from "./mobWebSocketUtils";
import * as MobMessages from "./mobWebMessages";
import { MobTimer } from "./mobTimer";
import { Status } from "./status";
import { openSocket } from "./testUtils";
import * as http from "http";

export const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
  let server: http.Server;

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

  test("Modify one of two mob timers", async () => {
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

  // todo 1a. comment out failing test. 1b. rerun tests. 1c. test two sockets join same mob and one updates the mob; both sockets should receive response message. 
  // todo 2. check other branch(es) for tests that might not have been copied into this branch
  // todo 3. rename message variables to request or response 

  test("Start timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.closeSocket();
    expect(socket.getLastJson().status).toEqual(Status.Running);
  });

  test("Pause timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.send(MobMessages.pauseMessage());
    await socket.closeSocket();
    expect(socket.getLastJson().status).toEqual(Status.Paused);
  });

  test("Resume timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.send(MobMessages.pauseMessage());
    await socket.send(MobMessages.resumeMessage());
    await socket.closeSocket();
    expect(socket.getLastJson().status).toEqual(Status.Resumed);
  });

  test("Update timer", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.send(MobMessages.updateMessage(40));
    await socket.closeSocket();
    expect(socket.getLastJson().durationMinutes).toEqual(40);
  });

  test("Start timer and elapse time sends message to all", async () => {
    const socket = await openSocket();
    await socket.joinMob("awesome-team");
    await socket.send(MobMessages.startMessage());
    await socket.send(MobMessages.updateMessage(1 / 60));
    await delaySeconds(1.5);
    await socket.closeSocket();
    expect(socket.getLastJson().status).toEqual(Status.Ready);
  });

  // todo: refactor - this is a duplicate from another test file (When we moved it to a separate file we got a 5000 ms timeout)
  function delaySeconds(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
});
