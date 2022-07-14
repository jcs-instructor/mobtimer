import { resetMobs, startMobServer } from "../src/server/mobSocketServer";
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

  beforeEach(async () => {
    _server = await startMobServer(port);
  });

  afterEach(async () => {
    resetMobs();
    await _server.close();
  });

  test("Create mob", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.closeSocket();
    expect(client.lastResponse.mobState).toEqual(new MobTimer(_mobName1).state);
  });

  test("Create 2 mobs", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);

    const client2 = await openSocket();
    await client2.joinMob(_mobName2);

    await client.closeSocket();
    await client2.closeSocket();

    expect(client.lastResponse.mobState).toEqual(new MobTimer(_mobName1).state);
    expect(client2.lastResponse.mobState).toEqual(new MobTimer(_mobName2).state);
  });

  test("Modify one of two mob timers", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);

    const client2 = await openSocket();
    await client2.joinMob(_mobName2);
    await client2.update(17);

    await client.closeSocket();
    await client2.closeSocket();

    expect(client.lastResponse.mobState.durationMinutes).toEqual(
      new MobTimer(_mobName1).state.durationMinutes
    );
    expect(client2.lastResponse.mobState.durationMinutes).toEqual(17);
  });

  // todo check other branch(es) for tests that might not have been copied into this branch
  // todo: consider renaming request as messageFromClient and response as messageToClient
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

    expect(client.lastResponse.mobState.durationMinutes).toEqual(17);
    expect(client2.lastResponse.mobState.durationMinutes).toEqual(17);
  });

  test("Start timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.closeSocket();
    expect(client.lastResponse.mobState.status).toEqual(Status.Running);
  });

  test("Pause timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.pause();
    await client.closeSocket();
    expect(client.lastResponse.mobState.status).toEqual(Status.Paused);
  });

  test("Resume timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.pause();
    await client.resume();
    await client.closeSocket();
    expect(client.lastResponse.mobState.status).toEqual(Status.Running);
  });

  test("Update timer", async () => {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.start();
    await client.update(40);
    await client.closeSocket();
    expect(client.lastResponse.mobState.durationMinutes).toEqual(40);
  });

  test.each([0.2, TimeUtils.millisecondsToSeconds(1)])(
    "Start timer with duration %p and elapse time sends message to all",
    async (durationSeconds: number) => {
      const toleranceSeconds = 0.1;
      const client = await openSocket();
      await client.joinMob(_mobName1);
      await client.update(TimeUtils.secondsToMinutes(durationSeconds));
      await client.start();
      await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
      await client.closeSocket();
      // todo: rename _receivedResponses or make public
      console.log(client._receivedResponses);
      expect(client.lastResponse.mobState.secondsRemaining).toEqual(0);
      expect(client.lastResponse.actionInfo.action).toEqual("expired");
      expect(client.lastResponse.mobState.status).toEqual(Status.Ready);
    }
  );

  test("Start timer, pause, and verify no message sent when timer would have expired", async () => {
    const durationSeconds = 1;
    const toleranceSeconds = 0.1;
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.update(TimeUtils.secondsToMinutes(durationSeconds));
    await client.start();
    await client.pause();
    await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
    await client.closeSocket();
    const numDigits = 1;
    expect(client.lastResponse.mobState.secondsRemaining).toBeCloseTo(
      durationSeconds,
      numDigits
    );
    expect(client.lastResponse.mobState.status).toEqual(Status.Paused);
    expect(client._receivedResponses.length).toEqual(4); // join, update, start, pause
  });
});
