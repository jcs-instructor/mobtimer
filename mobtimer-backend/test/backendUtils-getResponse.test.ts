import { backendUtils } from "../src/server/backendUtils";
import { Status, TimeUtils, Action } from "mobtimer-api";
import { RoomManager } from "../src/server/roomManager";
import { TestClient } from "./testClient";
import { Broadcaster } from "../src/server/broadcaster";

jest.useFakeTimers();

describe("Process Raw Request tests (no socket communication, so no expiration tests here)", () => {
  const _startMilliseconds = Date.now();
  const _toleranceSeconds = 0.05; // used to account for extra time it may take to complete timeout for time expired

  function getTimeSinceBeforeAll(): any {
    return Date.now() - _startMilliseconds;
  }

  function getTestName(): any {
    return expect.getState().currentTestName;
  }

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

  test("Reset (Cancel) timer", () => {
    /* Resetting timer causes sendToClient to be run, which would give error, so mock  */
    jest
      .spyOn(Broadcaster, "sendToClient")
      .mockImplementation((backendSocket: WebSocket, message: String) => {
        console.log("Parameters of mocked function", backendSocket, message);
      });
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
    const response = backendUtils.getResponse("some-bad-garbage-not-a-real-request", {});
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