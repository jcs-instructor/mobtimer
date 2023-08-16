import { processRawRequest } from "../src/server/backendSocket";
import { Status, TimeUtils, Action } from "mobtimer-api";
import { RoomManager } from "../src/server/roomManager";
import { TestClient } from "./testClient";

jest.useFakeTimers();

describe("Request Response Tests", () => {
  const _startMilliseconds = Date.now();
  const _toleranceSeconds = 0.05; // used to account for extra time it may take to complete timeout for time expired

  function getTimeSinceBeforeAll(): any {
    return Date.now() - _startMilliseconds;
  }

  function getTestName(): any {
    return expect.getState().currentTestName;
  }

  beforeEach(() => {
    console.log("Start: time", getTimeSinceBeforeAll(), getTestName());
  });

  afterEach(() => {
    console.log("End: time", getTimeSinceBeforeAll(), getTestName());
    RoomManager.resetRooms();
  });

  test("Create mob", () => {
    const client = new TestClient({});
    const mobName = "test-mob-1";
    client.joinMob(mobName);
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(Action.Join);
    expect(client.lastSuccessfulResponse.mobState.mobName).toEqual(mobName);
  });

  test("Start timer", () => {    
    const client = new TestClient({});
    const mobName = "test-mob-2";
    client.joinMob(mobName);
    client.start();
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(Action.Start);
    expect(client.lastSuccessfulResponse.mobState.status).toEqual(Status.Running);
  });

  test("Pause timer", () => {
    const client = new TestClient({});
    const mobName = "test-mob-3";
    client.joinMob(mobName);
    client.start();
    client.pause();
    expect(client.lastSuccessfulResponse.actionInfo.action).toEqual(Action.Pause);
    expect(client.lastSuccessfulResponse.mobState.status).toEqual(Status.Paused);
  });

  test("Resume timer", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.start();
    client.pause();
    client.start();    
    expect(client.lastSuccessfulMobState.status).toEqual(Status.Running);
    expect(client.lastSuccessfulAction).toEqual(Action.Start);
  });

  test("Update timer", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.start();
    client.update(40);  
    expect(client.lastSuccessfulMobState.durationMinutes).toEqual(40);
    expect(client.lastSuccessfulAction).toEqual("update");
  });

  test.skip.each([0.2])(
    "Start timer with duration %p and elapse time sends message to all",
    (durationSeconds: number) => {
      const client = new TestClient({});
      joinMobWithAutogeneratedName(client);
      client.update(TimeUtils.secondsToMinutes(durationSeconds));
      client.start();
      advanceTimersBySeconds(durationSeconds + _toleranceSeconds);    
      expect(client.lastSuccessfulAction).toEqual(Action.Expired);
      expect(client.lastSuccessfulMobState.secondsRemaining).toEqual(0);
      expect(client.lastSuccessfulMobState.status).toEqual(Status.Ready);
    }
  );

  test.skip("Reset (Cancel) timer", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.start();
    advanceTimersBySeconds(0.2);
    client.reset();    
    expect(client.lastSuccessfulAction).toEqual(Action.Reset);
    expect(client.lastSuccessfulMobState.secondsRemaining).toEqual(0);
    expect(client.lastSuccessfulMobState.status).toEqual(Status.Ready);
    // todo: expect participants don't rotate
  });

  test("Start timer, pause, and verify no message sent when timer would have expired", () => {
    const durationSeconds = 0.3;
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.update(TimeUtils.secondsToMinutes(durationSeconds));
    client.start();
    client.pause();
    advanceTimersBySeconds(durationSeconds + _toleranceSeconds);
    const numDigits = 1;
    expect(client.lastSuccessfulMobState.secondsRemaining).toBeCloseTo(
      durationSeconds,
      numDigits
    );
    expect(client.lastSuccessfulAction).toEqual(Action.Pause);
    expect(client.lastSuccessfulMobState.status).toEqual(Status.Paused);
  });


  test.skip("Start timer, pause, resume, and verify message sent to all when expires", () => {
    const durationSeconds = 0.3;
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.update(TimeUtils.secondsToMinutes(durationSeconds));
    client.start();
    client.pause();
    client.start();
    advanceTimersBySeconds(durationSeconds + _toleranceSeconds);
    expect(client.lastSuccessfulMobState.secondsRemaining).toEqual(0);
    expect(client.lastSuccessfulAction).toEqual(Action.Expired);
    expect(client.lastSuccessfulMobState.status).toEqual(Status.Ready);
    // todo: expect participants rotate - maybe in a separate test
    // todo: make a simpler expired test (no pausing, etc.)
  });

  test("Check got expected number of messages", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.update(TimeUtils.secondsToMinutes(0.2));
    client.start();
    client.pause();
    client.start(); // i.e., resume
    expect(client.successfulResponses.length).toEqual(5); // join, update, start, pause, start (resume)
  });

  test("Echo request and response", () => {
    const client = new TestClient({});
    client.sendEchoRequest();
    expect(client.echoReceived).toEqual(true);
  });

  test("Handle bad message and get good error message", () => {    
    const response = processRawRequest("some-bad-garbage-not-a-real-request", {});
    expect(response?.actionInfo?.action).toEqual(Action.InvalidRequestError);
  });

  test("New mob timer has no participants", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);    
    expect(client.lastSuccessfulMobState.participants.length).toBe(0);
  });

  test("Add 1st participant", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.addParticipant("Bob");
    expect(client.lastSuccessfulMobState.participants.length).toBe(1);
    expect(client.lastSuccessfulMobState.participants[0]).toBe("Bob");
  });

  test("Add 2nd participant", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.addParticipant("Alice");
    client.addParticipant("Bob");
    expect(client.lastSuccessfulMobState.participants.length).toBe(2);
    expect(client.lastSuccessfulMobState.participants).toStrictEqual([
      "Alice",
      "Bob",
    ]);
  });

  test("Don't add blank participant", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.addParticipant("");
    expect(client.lastSuccessfulMobState.participants.length).toBe(0);
  });

  test("Don't add participant with spaces only", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.addParticipant("   ");
    expect(client.lastSuccessfulMobState.participants.length).toBe(0);
  });

  test("Rotate participants", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.addParticipant("Alice");
    client.addParticipant("Bob");
    client.rotateParticipants();
    expect(client.lastSuccessfulMobState.participants).toStrictEqual([
      "Bob",
      "Alice",
    ]);
  });

  test("Edit participants", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.addParticipant("Alice");
    client.addParticipant("Bob");
    client.editParticipants(["Chris", "Danielle"]);
    expect(client.lastSuccessfulMobState.participants).toStrictEqual([
      "Chris",
      "Danielle",
    ]);
  });

  test("Edit roles", () => {
    const client = new TestClient({});
    joinMobWithAutogeneratedName(client);
    client.editRoles(["Talker"]);
    expect(client.lastSuccessfulMobState.roles).toStrictEqual(["Talker"]);
  });

  // todo: Add test for shuffling participants (i.e., randomizing). We alreay have a test for it in mobTimer.test.ts, but we should also test it here.
});

let mobCounter = 0;

function advanceTimersBySeconds(delaySeconds: number): number {
  jest.advanceTimersByTime(TimeUtils.secondsToMilliseconds(delaySeconds));
  return delaySeconds;
}

function joinMobWithAutogeneratedName(client: TestClient) {
  mobCounter++;
  const mobName = `autogenerated-mob-${mobCounter}`;
  client.joinMob(mobName);  
}