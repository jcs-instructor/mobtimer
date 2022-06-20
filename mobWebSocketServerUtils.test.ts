import { MobClient } from "./mobClient";
import { startMobServer } from "./mobWebSocketServerUtils";
import * as MobTimerRequests from "./mobTimerRequests";
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
    const client = await openSocket();
    await client.joinMob("awesome-team");
    await client.closeSocket();
    expect(client.getLastJson()).toEqual(new MobTimer("awesome-team").state);
  });

  test("Create 2 mobs", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");

    const client2 = await openSocket();
    await client2.joinMob("good-team");

    await client.closeSocket();
    await client2.closeSocket();

    expect(client.getLastJson()).toEqual(new MobTimer("awesome-team").state);
    expect(client2.getLastJson()).toEqual(new MobTimer("good-team").state);
  });

  test("Modify one of two mob timers", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");

    const client2 = await openSocket();
    await client2.joinMob("good-team");
    await client2.update(17);
    await client.closeSocket();
    await client2.closeSocket();

    expect(client.getLastJson().durationMinutes).toEqual(
      new MobTimer("awesome-team").state.durationMinutes
    );
    expect(client2.getLastJson().durationMinutes).toEqual(17);
  });

  // todo check other branch(es) for tests that might not have been copied into this branch
  // todo: consider renaming request as messageFromClient and response as messageToClient
  // todo refactor mobWebSocketServerUtils into a class (probably)
  // todo remove .skip from skipped test - when ready to implement time elapsed functionality
  test("Modify one shared mob timer", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");

    const client2 = await openSocket();
    await client2.joinMob("awesome-team");
    await client2.update(17);

    await client.closeSocket();
    await client2.closeSocket();

    expect(client.getLastJson().durationMinutes).toEqual(17);
    expect(client2.getLastJson().durationMinutes).toEqual(17);
  });

  test("Start timer", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");
    await client.start();
    await client.closeSocket();
    expect(client.getLastJson().status).toEqual(Status.Running);
  });

  test("Pause timer", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");
    await client.start();
    await client.pause();
    await client.closeSocket();
    expect(client.getLastJson().status).toEqual(Status.Paused);
  });

  test("Resume timer", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");
    await client.start();
    await client.pause();
    await client.resume();
    await client.closeSocket();
    expect(client.getLastJson().status).toEqual(Status.Resumed);
  });

  test("Update timer", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");
    await client.start();    
    await client.update(40);
    await client.closeSocket();
    expect(client.getLastJson().durationMinutes).toEqual(40);
  });

  test.skip("Start timer and elapse time sends message to all", async () => {
    const client = await openSocket();
    await client.joinMob("awesome-team");
    await client.start();
    await client.update(1 / 60);
    await delaySeconds(1.5);
    await client.closeSocket();
    expect(client.getLastJson().status).toEqual(Status.Ready);
  });

  // todo: refactor - this is a duplicate from another test file (When we moved it to a separate file we got a 5000 ms timeout)
  function delaySeconds(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
});
