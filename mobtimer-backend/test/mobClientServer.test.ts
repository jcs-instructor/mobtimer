import { startMobServer } from "../src/server/mobSocketServer";
import { MobState, MobTimer } from "mobtimer-api";
import { Status, TimeUtils, Action } from "mobtimer-api";
import * as http from "http";
import WebSocket from "ws";
import { RoomManager } from "../src/server/roomManager";
import { MobSocketTestClient, MobSocketClient } from "mobtimer-api";
import { W3CWebSocketWrapper, WSWebSocketWrapper } from "mobtimer-api";

describe("Client WebSocket Server Integration", () => {
  let _server: { httpServer: http.Server; wss: WebSocket.Server };
  const _mobName1 = "awesome-team";
  const startMilliseconds = Date.now();
  const port = 4000 + Number(process.env.JEST_WORKER_ID);
  const url = `ws://localhost:${port}`;
  const toleranceSeconds = 0.05; // used to account for extra time it may take to complete timeout for time expired
  let _client1: MobSocketTestClient;
  let _client2: MobSocketTestClient;

  function getTimeSinceBeforeAll(): any {
    return Date.now() - startMilliseconds;
  }

  function getTestName(): any {
    return expect.getState().currentTestName;
  }

  beforeAll(async () => {
    _server = await startMobServer(port);
    _client1 = await openMobSocket(url);
    _client2 = await openMobSocket(url);
  });

  beforeEach(() => {
    console.log("Start: time", getTimeSinceBeforeAll(), getTestName());
  });

  afterEach(() => {
    console.log("End: time", getTimeSinceBeforeAll(), getTestName());
    // todo: client cleanup here......
  });

  afterAll(async () => {
    RoomManager.resetRooms();
    // todo: Refactor to change return type for the startMobServer method to be a class with one exposed close method (so don't have to close both httpServer and wss separately from the consumer).
    await _server.wss.close();
    await _server.httpServer.close();
  });

  test("Create mob with alternative websocket", async () => {
    const client = await openSocketAlternative(url);
    await client.joinMob(_mobName1);
    await client.waitForLastResponse();
    expect(client.lastSuccessfulMobState).toEqual(getNewState(_mobName1));
    expect(client.lastSuccessfulAction).toEqual(Action.Join);
  });

  test("Create mob", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState).toEqual(getNewState(_mobName1));
    expect(_client1.lastSuccessfulAction).toEqual(Action.Join);
  });

  test("Create 2 mobs", async () => {
    const _mobName1 = await joinMob(_client1);

    const _mobName2 = await joinMob(_client2, "1");

    await _client1.waitForLastResponse();
    await _client2.waitForLastResponse();

    expect(_client1.lastSuccessfulMobState).toEqual(getNewState(_mobName1));
    expect(_client2.lastSuccessfulMobState).toEqual(getNewState(_mobName2));
  });

  test("Modify one of two mob timers", async () => {
    const _mobName1 = await joinMob(_client1);
    const _mobName2 = await joinMob(_client2, "1");
    await _client2.update(17);
    await _client1.waitForLastResponse();
    await _client2.waitForLastResponse();

    expect(_client1.lastSuccessfulMobState.durationMinutes).toEqual(
      getDefaultDurationMinutes()
    );
    expect(_client2.lastSuccessfulMobState.durationMinutes).toEqual(17);
  });

  // todo: maybe split into two tests: one for the length of the responses array, and one for the last response.
  test("Modify one shared mob timer", async () => {
    const mobNameForBothTeams = "super-team";

    const client = await openMobSocket(url);
    await client.joinMob(mobNameForBothTeams);

    const client2 = await openMobSocket(url);
    await client2.joinMob(mobNameForBothTeams);
    await client2.update(17);

    await client.waitForLastResponse();
    await client2.waitForLastResponse();

    expect(client.lastSuccessfulMobState.durationMinutes).toEqual(17);
    expect(client2.lastSuccessfulMobState.durationMinutes).toEqual(17);

    expect(client.successfulResponses.length).toEqual(3); // join, join, update
    expect(client2.successfulResponses.length).toEqual(2); // join, update
  });

  test("Second client joins shared mob in paused state", async () => {
    const mobNameForBothTeams = await joinMob(_client1, "super-team");
    await _client1.update(1);
    _client1.start();
    const delaySeconds = 0.2;
    await TimeUtils.delaySeconds(delaySeconds);
    _client1.pause();
    await _client1.waitForLastResponse();

    const client2 = await openMobSocket(url);
    await client2.joinMob(mobNameForBothTeams);

    await client2.waitForLastResponse();

    const numDigits = 1;
    const expected = 60 - delaySeconds;
    console.log(
      "mobstate",
      _client1.lastSuccessfulMobState,
      client2.lastSuccessfulMobState
    );
    expect(_client1.lastSuccessfulMobState.secondsRemaining).toBeCloseTo(
      expected,
      numDigits
    );
    expect(client2.lastSuccessfulMobState.secondsRemaining).toBeCloseTo(
      expected,
      numDigits
    );
  });

  test("Start timer", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.start();
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulAction).toEqual(Action.Start);
    expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Running);
  });

  test("Pause timer", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.start();
    await _client1.pause();
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Paused);
    expect(_client1.lastSuccessfulAction).toEqual(Action.Pause);
  });

  test("Resume timer", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.start();
    await _client1.pause();
    await _client1.start();
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Running);
    expect(_client1.lastSuccessfulAction).toEqual(Action.Start);
  });

  test("Update timer", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.start();
    await _client1.update(40);
    await _client1.waitForLastResponse();

    expect(_client1.lastSuccessfulMobState.durationMinutes).toEqual(40);
    expect(_client1.lastSuccessfulAction).toEqual("update");
  });

  test.each([0.2])(
    "Start timer with duration %p and elapse time sends message to all",
    async (durationSeconds: number) => {
      await joinMob(_client1);
      await _client1.update(TimeUtils.secondsToMinutes(durationSeconds));
      await _client1.start();
      await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
      await _client1.waitForLastResponse();
      expect(_client1.lastSuccessfulAction).toEqual(Action.Expired);
      expect(_client1.lastSuccessfulMobState.secondsRemaining).toEqual(0);
      expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Ready);
    }
  );

  test("Reset (Cancel) timer", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.start();
    await TimeUtils.delaySeconds(0.2);
    await _client1.reset();
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulAction).toEqual(Action.Reset);
    expect(_client1.lastSuccessfulMobState.secondsRemaining).toEqual(0);
    expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Ready);
    // todo: expect participants don't rotate
  });

  test("Start timer, pause, and verify no message sent when timer would have expired", async () => {
    const durationSeconds = 1;
    const _mobName1 = await joinMob(_client1);
    await _client1.update(TimeUtils.secondsToMinutes(durationSeconds));
    await _client1.start();
    await _client1.pause();
    await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
    await _client1.waitForLastResponse();
    const numDigits = 1;
    expect(_client1.lastSuccessfulMobState.secondsRemaining).toBeCloseTo(
      durationSeconds,
      numDigits
    );
    expect(_client1.lastSuccessfulAction).toEqual(Action.Pause);
    expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Paused);
  });

  test("Start timer, pause, resume, and verify message sent to all when expires", async () => {
    const durationSeconds = 1;
    const _mobName1 = await joinMob(_client1);
    await _client1.update(TimeUtils.secondsToMinutes(durationSeconds));
    await _client1.start();
    await _client1.pause();
    await _client1.start();
    await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
    await _client1.waitForLastResponse();
    const numDigits = 1;
    expect(_client1.lastSuccessfulMobState.secondsRemaining).toEqual(0);
    expect(_client1.lastSuccessfulAction).toEqual(Action.Expired);
    expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Ready);
    // todo: expect participants rotate - maybe in a separate test
    // todo: make a simpler expired test (no pausing, etc.)
  });

  test("Check got expected number of messages", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.update(TimeUtils.secondsToMinutes(0.2));
    await _client1.start();
    await _client1.pause();
    await _client1.start(); // i.e., resume
    await _client1.waitForLastResponse();
    expect(_client1.successfulResponses.length).toEqual(5); // join, update, start, pause, start (resume)
  });

  test("Echo request and response", async () => {
    const anotherClient = await openMobSocket(url);
    await anotherClient.waitForLastResponse();
    expect(anotherClient.echoReceived).toEqual(true);
  });

  test("Handle bad message and get good error message", async () => {
    const anotherClient = await openMobSocket(url);
    await anotherClient.webSocket.sendMessage(
      "some-bad-garbage-not-a-real-request"
    );
    await anotherClient.waitForLastResponse();
    expect(anotherClient.successfulResponses.length).toEqual(0);
    expect(anotherClient.errorReceived).toEqual(true);
  });

  test("Handle bad message and subsequent request succeeds", async () => {
    const anotherClient = await openMobSocket(url);
    await anotherClient.webSocket.sendMessage(
      "some-bad-garbage-not-a-real-request"
    );
    await joinMob(anotherClient);
    await anotherClient.waitForLastResponse();
    expect(anotherClient.successfulResponses.length).toEqual(1); // join
    expect(anotherClient.errorReceived).toEqual(true);
  });

  test("New mob timer has no participants", async () => {
    const _mobName1 = await joinMob(_client1);
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.participants.length).toBe(0);
  });

  test("Add 1st participant", async () => {
    const _mobName1 = await joinMob(_client1);
    _client1.addParticipant("Bob");
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.participants.length).toBe(1);
    expect(_client1.lastSuccessfulMobState.participants[0]).toBe("Bob");
  });

  test("Add 2nd participant", async () => {
    const _mobName1 = await joinMob(_client1);
    _client1.addParticipant("Alice");
    _client1.addParticipant("Bob");
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.participants.length).toBe(2);
    expect(_client1.lastSuccessfulMobState.participants).toStrictEqual([
      "Alice",
      "Bob",
    ]);
  });

  test("Don't add blank participant", async () => {
    const _mobName1 = await joinMob(_client1);
    _client1.addParticipant("");
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.participants.length).toBe(0);
  });

  test("Don't add participant with spaces only", async () => {
    const _mobName1 = await joinMob(_client1);
    _client1.addParticipant("   ");
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.participants.length).toBe(0);
  });

  test("Rotate participants", async () => {
    const _mobName1 = await joinMob(_client1);
    _client1.addParticipant("Alice");
    _client1.addParticipant("Bob");
    _client1.rotateParticipants();
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.participants).toStrictEqual([
      "Bob",
      "Alice",
    ]);
  });

  test("Edit participants", async () => {
    const _mobName1 = await joinMob(_client1);
    _client1.addParticipant("Alice");
    _client1.addParticipant("Bob");
    _client1.editParticipants(["Chris", "Danielle"]);
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.participants).toStrictEqual([
      "Chris",
      "Danielle",
    ]);
  });

  test("Edit roles", async () => {
    const _mobName1 = await joinMob(_client1);
    _client1.editRoles(["Talker"]);
    await _client1.waitForLastResponse();
    expect(_client1.lastSuccessfulMobState.roles).toStrictEqual(["Talker"]);
  });

  // todo: Add test for shuffling participants (i.e., randomizing). We alreay have a test for it in mobTimer.test.ts, but we should also test it here.
});

let mobCounter = 0;

async function joinMob(client: MobSocketTestClient, suffix = "") {
  mobCounter++;
  const mobName = `autogenerated-mob${suffix}-${mobCounter}`;
  client.resetClient();
  await client.joinMob(mobName);
  return mobName;
}

async function openMobSocket(url: string) {
  return await MobSocketTestClient.waitForOpenSocket(
    new W3CWebSocketWrapper(url)
  );
}

async function openSocketAlternative(url: string) {
  return await MobSocketTestClient.waitForOpenSocket(
    new WSWebSocketWrapper(url)
  );
}

function getNewState(mobName: string): MobState {
  return new MobTimer(mobName).state;
}

function getDefaultDurationMinutes(): number {
  return new MobTimer("name-doesnt-matter-here").durationMinutes;
}

function advanceTimersBySeconds(delaySeconds: number): number {
  jest.advanceTimersByTime(TimeUtils.secondsToMilliseconds(delaySeconds));
  return delaySeconds;
}
