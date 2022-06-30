import { startMobServer } from "../src/server/mobSocketServer";
import { MobTimer } from "../src/mobTimer";
import { Status } from "../src/status";
import { openSocket } from "./testUtils";
import * as http from "http";
import { TimeUtils } from "../src/timeUtils";

export const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
  let _server: http.Server;
  const _mobName1 = "awesome-team";
  const _mobName2 = "good-team";

  beforeAll(async () => (_server = await startMobServer(port)));

  afterAll(() => _server.close());

  test("Create mob", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.closeSocket();
    expect(client.lastResponse).toEqual(new MobTimer(_mobName1).state);
  });

  test("Create 2 mobs", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);

    const client2 = await openSocket();
    await client2.joinMob(_mobName2);

    await client.closeSocket();
    await client2.closeSocket();

    expect(client.lastResponse).toEqual(new MobTimer(_mobName1).state);
    expect(client2.lastResponse).toEqual(new MobTimer(_mobName2).state);
  });

  test("Modify one of two mob timers", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);

    const client2 = await openSocket();
    await client2.joinMob(_mobName2);
    await client2.update(17);

    await client.closeSocket();
    await client2.closeSocket();

    expect(client.lastResponse.durationMinutes).toEqual(
      new MobTimer(_mobName1).state.durationMinutes
    );
    expect(client2.lastResponse.durationMinutes).toEqual(17);
  });

  // todo check other branch(es) for tests that might not have been copied into this branch
  // todo: consider renaming request as messageFromClient and response as messageToClient
  // todo refactor mobWebSocketServerUtils into a class (probably)
  // todo remove .skip from skipped test - when ready to implement time elapsed functionality
  test("Modify one shared mob timer", async () => {
    const mobNameForBothTeams = "super-team";

    const client = await openSocket();
    await client.joinMob(mobNameForBothTeams);

    const client2 = await openSocket();
    await client2.joinMob(mobNameForBothTeams);
    await client2.update(17);

    await client.closeSocket();
    await client2.closeSocket();

    expect(client.lastResponse.durationMinutes).toEqual(17);
    expect(client2.lastResponse.durationMinutes).toEqual(17);
  });

  test("Start timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.closeSocket();
    expect(client.lastResponse.status).toEqual(Status.Running);
  });

  test("Pause timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.pause();
    await client.closeSocket();
    expect(client.lastResponse.status).toEqual(Status.Paused);
  });

  test("Resume timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.pause();
    await client.resume();
    await client.closeSocket();
    expect(client.lastResponse.status).toEqual(Status.Resumed);
  });

  test("Update timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.update(40);
    await client.closeSocket();
    expect(client.lastResponse.durationMinutes).toEqual(40);
  });

  test.skip("Start timer and elapse time sends message to all", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.update(TimeUtils.secondsToMinutes(1));
    await delaySeconds(1.5);
    await client.closeSocket();
    expect(client.lastResponse.status).toEqual(Status.Ready);
  });

  // todo: refactor - this is a duplicate from another test file (When we moved it to a separate file we got a 5000 ms timeout)
  function delaySeconds(seconds: number) {
    return new Promise((resolve) =>
      setTimeout(resolve, TimeUtils.secondsToMilliseconds(seconds))
    );
  }
});