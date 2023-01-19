import { startMobServer } from "../src/server/mobSocketServer";
import { MobTimer } from "mobtimer-api";
import { Status, TimeUtils, Action } from "mobtimer-api";
import * as http from "http";
import WebSocket from "ws";
import { RoomManager } from "../src/server/roomManager";
import { MobSocketTestClient } from "mobtimer-api";

describe("WebSocket Server", () => {
  let _server: { httpServer: http.Server; wss: WebSocket.Server };
  const _mobName1 = "awesome-team";
  const _mobName2 = "good-team";
  const port = 4000 + Number(process.env.JEST_WORKER_ID);
  const url = `ws://localhost:${port}`;

  beforeEach(async () => {
    _server = await startMobServer(port);
  });

  afterEach(async () => {
    RoomManager.resetRooms();
    // todo: Refactor to change return type for the startMobServer method to be a class with one exposed close method (so don't have to close both httpServer and wss separately from the consumer).
    await _server.wss.close();
    await _server.httpServer.close();
  });

  test("Create mob", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await cleanUp(client);
    expect(client.lastSuccessfulResponse.mobState).toEqual(
      new MobTimer(_mobName1).state
    );
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
      Action.Join
    );
  });

  test("Create 2 mobs", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);

    const client2 = await openSocket(url);
    await client2.joinMob(_mobName2);

    await cleanUp(client);
    await cleanUp(client2);

    expect(client.lastSuccessfulResponse.mobState).toEqual(
      new MobTimer(_mobName1).state
    );
    expect(client2.lastSuccessfulResponse.mobState).toEqual(
      new MobTimer(_mobName2).state
    );
  });

  test("Modify one of two mob timers", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);

    const client2 = await openSocket(url);
    await client2.joinMob(_mobName2);
    await client2.update(17);
    await cleanUp(client);
    await cleanUp(client2);

    expect(client.lastSuccessfulResponse.mobState.durationMinutes).toEqual(
      new MobTimer(_mobName1).state.durationMinutes
    );
    expect(client2.lastSuccessfulResponse.mobState.durationMinutes).toEqual(17);
  });

  // todo check other branch(es) for tests that might not have been copied into this branch (!)

  // todo: maybe split into two tests: one for the length of the responses array, and one for the last response.
  test("Modify one shared mob timer", async () => {
    const mobNameForBothTeams = "super-team";

    const client = await openSocket(url);
    await client.joinMob(mobNameForBothTeams);

    const client2 = await openSocket(url);
    await client2.joinMob(mobNameForBothTeams);
    await client2.update(17);

    await cleanUp(client);
    await cleanUp(client2);

    expect(client.lastSuccessfulResponse.mobState.durationMinutes).toEqual(17);
    expect(client2.lastSuccessfulResponse.mobState.durationMinutes).toEqual(17);

    expect(client.successfulResponses.length).toEqual(3); // join, join, update
    expect(client2.successfulResponses.length).toEqual(2); // join, update
  });

  test("Start timer", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await client.start();
    await cleanUp(client);
    expect(client.lastSuccessfulResponse.mobState.status).toEqual(
      Status.Running
    );
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
      Action.Start
    );
  });

  test("Pause timer", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await client.start();
    await client.pause();
    await cleanUp(client);
    expect(client.lastSuccessfulResponse.mobState.status).toEqual(
      Status.Paused
    );
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
      Action.Pause
    );
  });

  test("Resume timer", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await client.start();
    await client.pause();
    await client.start();
    await cleanUp(client);
    expect(client.lastSuccessfulResponse.mobState.status).toEqual(
      Status.Running
    );
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
      Action.Start
    );
  });

  test("Update timer", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await client.start();
    await client.update(40);
    await cleanUp(client);

    expect(client.lastSuccessfulResponse.mobState.durationMinutes).toEqual(40);

    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual("update");
  });

  test.each([0.2, TimeUtils.millisecondsToSeconds(1)])(
    "Start timer with duration %p and elapse time sends message to all",
    async (durationSeconds: number) => {
      const toleranceSeconds = 0.1;
      const client = await openSocket(url);
      await client.joinMob(_mobName1);
      await client.update(TimeUtils.secondsToMinutes(durationSeconds));
      await client.start();
      await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
      await cleanUp(client);
      expect(client.lastSuccessfulResponse.mobState.secondsRemaining).toEqual(
        0
      );
      expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
        Action.Expired
      );
      expect(client.lastSuccessfulResponse.mobState.status).toEqual(
        Status.Ready
      );
    }
  );

  test.each([0.2, TimeUtils.millisecondsToSeconds(1)])(
    "Only send expiration message once - Start timer with duration %p",
    async (durationSeconds: number) => {
      const toleranceSeconds = 0.1;
      const client = await openSocket(url);
      await client.joinMob(_mobName1);
      await client.update(TimeUtils.secondsToMinutes(durationSeconds));
      // todo: make this reproduce piling up of expire messages...
      await client.start(); // 1st start
      await client.start(); // 2nd start
      await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
      await client.start(); // 3rd start
      await cleanUp(client);
      expect(client.lastSuccessfulResponse.mobState.secondsRemaining).toEqual(
        0
      );
      expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
        Action.Expired
      );
      expect(client.lastSuccessfulResponse.mobState.status).toEqual(
        Status.Ready
      );
    }
  );

  test("Start timer, pause, and verify no message sent when timer would have expired", async () => {
    const durationSeconds = 1;
    const toleranceSeconds = 0.1;
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await client.update(TimeUtils.secondsToMinutes(durationSeconds));
    await client.start();
    await client.pause();
    await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
    await cleanUp(client);
    const numDigits = 1;
    expect(client.lastSuccessfulResponse.mobState.secondsRemaining).toBeCloseTo(
      durationSeconds,
      numDigits
    );
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
      Action.Pause
    );
    expect(client.lastSuccessfulResponse.mobState.status).toEqual(
      Status.Paused
    );
  });

  test("Start timer, pause, resume, and verify message sent to all when expires", async () => {
    const durationSeconds = 1;
    const toleranceSeconds = 0.1;
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await client.update(TimeUtils.secondsToMinutes(durationSeconds));
    await client.start();
    await client.pause();
    await client.start();
    await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
    await cleanUp(client);
    const numDigits = 1;
    expect(client.lastSuccessfulResponse.mobState.secondsRemaining).toEqual(0);
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(
      Action.Expired
    );
    expect(client.lastSuccessfulResponse.mobState.status).toEqual(Status.Ready);
  });

  test("Check got expected number of messages", async () => {
    const client = await openSocket(url);
    await client.joinMob(_mobName1);
    await client.update(TimeUtils.secondsToMinutes(0.2));
    await client.start();
    await client.pause();
    await client.start(); // i.e., resume
    await cleanUp(client);
    expect(client.successfulResponses.length).toEqual(5); // join, update, start, pause, start (resume)
  });

  test("Echo request and response", async () => {
    const client = await openSocket(url);
    await cleanUp(client);
    expect(client.echoReceived).toEqual(true);
  });

  test("Handle bad message and get good error message", async () => {
    const client = await openSocket(url);
    await client.webSocket.send("some-bad-garbage-not-a-real-request");
    await cleanUp(client);
    expect(client.successfulResponses.length).toEqual(0);
    expect(client.errorReceived).toEqual(true);
  });

  test("Handle bad message and subsequent request succeeds", async () => {
    const client = await openSocket(url);
    await client.webSocket.send("some-bad-garbage-not-a-real-request");
    await client.joinMob(_mobName1);
    await cleanUp(client);
    expect(client.successfulResponses.length).toEqual(1); // join
    expect(client.errorReceived).toEqual(true);
  });
});

async function openSocket(url: string) {
  return await MobSocketTestClient.openSocket(url);
}

async function cleanUp(client: MobSocketTestClient) {
  await client.waitForLastResponse();
  await client.closeSocket();
}
