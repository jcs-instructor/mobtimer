import {
  processRawRequest,
  startMobServer,
} from "../src/server/mobSocketServer";
import {
  MobRequestBuilder,
  MobSocketClient,
  MobState,
  MobTimer,
  MobTimerRequests,
  MobTimerResponses,
} from "mobtimer-api";
import { Status, TimeUtils, Action } from "mobtimer-api";
import { RoomManager } from "../src/server/roomManager";

describe("Client WebSocket Server Integration", () => {
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

  test.only("Create mob", () => {
    const mobName = "test-mob";
    // todo: once we've created a RequestStringBuilder, we can use it here and from the client, and in the client
    // the sendJSON won't need to stringify the request any more (it will be done in the RequestStringBuilder).
    // const requestString = RequestStringBuilder.joinRequest(mobName); 
    const request = MobRequestBuilder.joinMob(mobName); // createJoinRequestString(mobName);
    const requestString = JSON.stringify(request);
    const response = processGoodRequest(requestString);
    expect(response.mobState.mobName).toEqual(mobName);
    expect(response.actionInfo.action).toEqual(Action.Join);
  });

  // test("Create 2 mobs", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   const mobName1 = _client1.mobName;

  //   joinMobWithAutogeneratedName(_client2);
  //   const mobName2 = _client2.mobName;

  //   _client1.waitForLastResponse();
  //   _client2.waitForLastResponse();

  //   expect(_client1.lastSuccessfulMobState).toEqual(getNewState(mobName1));
  //   expect(_client2.lastSuccessfulMobState).toEqual(getNewState(mobName2));
  // });

  // test("Modify one of two mob timers", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   joinMobWithAutogeneratedName(_client2);
  //   _client2.update(17);
  //   _client1.waitForLastResponse();
  //   _client2.waitForLastResponse();

  //   expect(_client1.lastSuccessfulMobState.durationMinutes).toEqual(
  //     getDefaultDurationMinutes()
  //   );
  //   expect(_client2.lastSuccessfulMobState.durationMinutes).toEqual(17);
  // });

  // // todo: maybe split into two tests: one for the length of the responses array, and one for the last response.
  // test("Modify one shared mob timer", () => {
  //   const mobNameForBothTeams = "super-team";

  //   _client1.joinMob(mobNameForBothTeams);

  //   _client2.joinMob(mobNameForBothTeams);
  //   _client2.update(17);

  //   _client1.waitForLastResponse();
  //   _client2.waitForLastResponse();

  //   expect(_client1.lastSuccessfulMobState.durationMinutes).toEqual(17);
  //   expect(_client2.lastSuccessfulMobState.durationMinutes).toEqual(17);

  //   expect(_client1.successfulResponses.length).toEqual(3); // join, join, update
  //   expect(_client2.successfulResponses.length).toEqual(2); // join, update
  // });

  // test("Second client joins shared mob in paused state", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   const mobNameForBothTeams = _client1.mobName;
  //   _client1.update(1);
  //   _client1.start();
  //   const delaySeconds = 0.2;
  //   TimeUtils.delaySeconds(delaySeconds);
  //   _client1.pause();
  //   _client1.waitForLastResponse();

  //   _client2.joinMob(mobNameForBothTeams);
  //   _client2.waitForLastResponse();

  //   const numDigits = 1;
  //   const expected = 60 - delaySeconds;
  //   console.log(
  //     "mobstate",
  //     _client1.lastSuccessfulMobState,
  //     _client2.lastSuccessfulMobState
  //   );
  //   expect(_client1.lastSuccessfulMobState.secondsRemaining).toBeCloseTo(
  //     expected,
  //     numDigits
  //   );
  //   expect(_client2.lastSuccessfulMobState.secondsRemaining).toBeCloseTo(
  //     expected,
  //     numDigits
  //   );
  // });

  // test("Start timer", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.start();
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulAction).toEqual(Action.Start);
  //   expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Running);
  // });

  // test("Pause timer", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.start();
  //   _client1.pause();
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Paused);
  //   expect(_client1.lastSuccessfulAction).toEqual(Action.Pause);
  // });

  // test("Resume timer", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.start();
  //   _client1.pause();
  //   _client1.start();
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Running);
  //   expect(_client1.lastSuccessfulAction).toEqual(Action.Start);
  // });

  // test("Update timer", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.start();
  //   _client1.update(40);
  //   _client1.waitForLastResponse();

  //   expect(_client1.lastSuccessfulMobState.durationMinutes).toEqual(40);
  //   expect(_client1.lastSuccessfulAction).toEqual("update");
  // });

  // test.each([0.2])(
  //   "Start timer with duration %p and elapse time sends message to all",
  //   (durationSeconds: number) => {
  //     joinMobWithAutogeneratedName(_client1);
  //     _client1.update(TimeUtils.secondsToMinutes(durationSeconds));
  //     _client1.start();
  //     TimeUtils.delaySeconds(durationSeconds + _toleranceSeconds);
  //     _client1.waitForLastResponse();
  //     expect(_client1.lastSuccessfulAction).toEqual(Action.Expired);
  //     expect(_client1.lastSuccessfulMobState.secondsRemaining).toEqual(0);
  //     expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Ready);
  //   }
  // );

  // test("Reset (Cancel) timer", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.start();
  //   TimeUtils.delaySeconds(0.2);
  //   _client1.reset();
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulAction).toEqual(Action.Reset);
  //   expect(_client1.lastSuccessfulMobState.secondsRemaining).toEqual(0);
  //   expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Ready);
  //   // todo: expect participants don't rotate
  // });

  // test("Start timer, pause, and verify no message sent when timer would have expired", () => {
  //   const durationSeconds = 0.3;
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.update(TimeUtils.secondsToMinutes(durationSeconds));
  //   _client1.start();
  //   _client1.pause();
  //   TimeUtils.delaySeconds(durationSeconds + _toleranceSeconds);
  //   _client1.waitForLastResponse();
  //   const numDigits = 1;
  //   expect(_client1.lastSuccessfulMobState.secondsRemaining).toBeCloseTo(
  //     durationSeconds,
  //     numDigits
  //   );
  //   expect(_client1.lastSuccessfulAction).toEqual(Action.Pause);
  //   expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Paused);
  // });

  // test("Start timer, pause, resume, and verify message sent to all when expires", () => {
  //   const durationSeconds = 0.3;
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.update(TimeUtils.secondsToMinutes(durationSeconds));
  //   _client1.start();
  //   _client1.pause();
  //   _client1.start();
  //   TimeUtils.delaySeconds(durationSeconds + _toleranceSeconds);
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.secondsRemaining).toEqual(0);
  //   expect(_client1.lastSuccessfulAction).toEqual(Action.Expired);
  //   expect(_client1.lastSuccessfulMobState.status).toEqual(Status.Ready);
  //   // todo: expect participants rotate - maybe in a separate test
  //   // todo: make a simpler expired test (no pausing, etc.)
  // });

  // test("Check got expected number of messages", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.update(TimeUtils.secondsToMinutes(0.2));
  //   _client1.start();
  //   _client1.pause();
  //   _client1.start(); // i.e., resume
  //   _client1.waitForLastResponse();
  //   expect(_client1.successfulResponses.length).toEqual(5); // join, update, start, pause, start (resume)
  // });

  // test("Echo request and response", () => {
  //   _client1.waitForLastResponse();
  //   expect(_client1.echoReceived).toEqual(true);
  // });

  // test("Handle bad message and get good error message", () => {
  //   _client1.webSocket.sendMessage(
  //     "some-bad-garbage-not-a-real-request"
  //   );
  //   _client1.waitForLastResponse();
  //   expect(_client1.successfulResponses.length).toEqual(0);
  //   expect(_client1.errorReceived).toEqual(true);
  // });

  // test("Handle bad message and subsequent request succeeds", () => {
  //   _client1.webSocket.sendMessage(
  //     "some-bad-garbage-not-a-real-request"
  //   );
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.waitForLastResponse();
  //   expect(_client1.successfulResponses.length).toEqual(1); // join
  //   expect(_client1.errorReceived).toEqual(true);
  // });

  // test("New mob timer has no participants", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.participants.length).toBe(0);
  // });

  // test("Add 1st participant", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.addParticipant("Bob");
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.participants.length).toBe(1);
  //   expect(_client1.lastSuccessfulMobState.participants[0]).toBe("Bob");
  // });

  // test("Add 2nd participant", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.addParticipant("Alice");
  //   _client1.addParticipant("Bob");
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.participants.length).toBe(2);
  //   expect(_client1.lastSuccessfulMobState.participants).toStrictEqual([
  //     "Alice",
  //     "Bob",
  //   ]);
  // });

  // test("Don't add blank participant", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.addParticipant("");
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.participants.length).toBe(0);
  // });

  // test("Don't add participant with spaces only", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.addParticipant("   ");
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.participants.length).toBe(0);
  // });

  // test("Rotate participants", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.addParticipant("Alice");
  //   _client1.addParticipant("Bob");
  //   _client1.rotateParticipants();
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.participants).toStrictEqual([
  //     "Bob",
  //     "Alice",
  //   ]);
  // });

  // test("Edit participants", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.addParticipant("Alice");
  //   _client1.addParticipant("Bob");
  //   _client1.editParticipants(["Chris", "Danielle"]);
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.participants).toStrictEqual([
  //     "Chris",
  //     "Danielle",
  //   ]);
  // });

  // test("Edit roles", () => {
  //   joinMobWithAutogeneratedName(_client1);
  //   _client1.editRoles(["Talker"]);
  //   _client1.waitForLastResponse();
  //   expect(_client1.lastSuccessfulMobState.roles).toStrictEqual(["Talker"]);
  // });

  // todo: Add test for shuffling participants (i.e., randomizing). We alreay have a test for it in mobTimer.test.ts, but we should also test it here.
});

let mobCounter = 0;

function processGoodRequest(requestString: string) {
  const { response } = processRawRequest(requestString, {});
  return response as MobTimerResponses.SuccessfulResponse;
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
function createJoinRequestString(mobName: string): string {
  const request = {
    action: Action.Join,
    mobName: mobName,
  } as MobTimerRequests.JoinRequest;
  return JSON.stringify(request);
}
