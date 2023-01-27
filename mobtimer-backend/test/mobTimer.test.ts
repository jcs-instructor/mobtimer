import { MobTimer } from "mobtimer-api";
import { MobTestTimer } from "./mobTestTimer";
import { Status, TimeUtils } from "mobtimer-api";

test("Test that is not skipped", () => { });

test("Set duration to 3.5 minutes", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 3.5;
  expect(mobTimer.durationMinutes).toEqual(3.5);
});

test("Initial status - timer is Ready", () => {
  const mobTimer = new MobTestTimer();
  expect(mobTimer.status).toEqual(Status.Ready);
});

test("Start timer", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.start();
  expect(mobTimer.status).toEqual(Status.Running);
});

test("Get seconds remaining before start for turn duration with single digit minutes", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 6;
  expect(mobTimer.secondsRemainingString).toEqual("00:00");
});

test("Get seconds remaining string after start for turn duration with fractional minutes", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 5.5;
  mobTimer.start();
  expect(mobTimer.secondsRemainingString).toEqual("05:30");
});

test("Get seconds remaining string after start for turn duration with double digit minutes", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 12;
  mobTimer.start();
  expect(mobTimer.secondsRemainingString).toEqual("12:00");
});

test("Get seconds remaining 1 second after start", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  expect(mobTimer.secondsRemaining).toEqual(minutesToSeconds(6));
  mobTimer.delaySeconds(1);
  expect(mobTimer.secondsRemaining).toEqual(minutesToSeconds(6) - 1);
});

test("Get time remaining string 1 second after start", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  mobTimer.delaySeconds(1);
  expect(mobTimer.secondsRemainingString).toEqual("05:59");
});

test("Get time remaining string 0.1 seconds after start", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 2;
  mobTimer.start();
  mobTimer.delaySeconds(0.1);
  expect(mobTimer.secondsRemainingString).toEqual("02:00");
});

test("Get seconds remaining 1 second after start (real)", async () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  const numDigits = 1;
  expect(mobTimer.secondsRemaining).toBeCloseTo(minutesToSeconds(6), numDigits);
  await TimeUtils.delaySeconds(1);
  expect(mobTimer.secondsRemaining).toBeCloseTo(minutesToSeconds(6) - 1, numDigits);
});

test("Ready status after time expires", async () => {
  const mobTimer = new MobTimer();
  const durationSeconds = 0.2;
  mobTimer.durationMinutes = durationSeconds / 60;
  mobTimer.start();
  const numDigits = 2;
  await TimeUtils.delaySeconds(durationSeconds);
  expect(mobTimer.secondsRemaining).toEqual(0);
  expect(mobTimer.status).toBe(Status.Ready);
});

test("Start after time expires", async () => {
  const mobTimer = new MobTimer();
  const durationSeconds = 0.2;
  const paddingSecondsToBeSureTimeExpires = 0.1;
  mobTimer.durationMinutes = durationSeconds / 60;
  mobTimer.start();
  const numDigits = 1;
  await TimeUtils.delaySeconds(durationSeconds + paddingSecondsToBeSureTimeExpires);
  await mobTimer.start();
  expect(mobTimer.secondsRemaining).toBeCloseTo(
    mobTimer.durationSeconds,
    numDigits
  );
  expect(mobTimer.status).toBe(Status.Running);
});

test("Pause timer", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.start();
  mobTimer.pause();
  expect(mobTimer.status).toEqual(Status.Paused);
});

test("Resume timer", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.start();
  mobTimer.pause();
  mobTimer.start();
  expect(mobTimer.status).toEqual(Status.Running);
});

test("Get seconds remaining after 1 second pause", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  mobTimer.delaySeconds(1);
  mobTimer.pause();
  mobTimer.delaySeconds(1);
  expect(mobTimer.secondsRemainingString).toEqual("05:59");
});

test("Get seconds remaining after running 1 second and paused 1", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  mobTimer.delaySeconds(1);
  mobTimer.pause();
  mobTimer.delaySeconds(2);
  expect(mobTimer.secondsRemainingString).toEqual("05:59");
});

test("Get seconds remaining after running 1 second, paused 1 second, and resume 1 second", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  mobTimer.delaySeconds(1);
  mobTimer.pause();
  mobTimer.delaySeconds(2);
  mobTimer.start();
  mobTimer.delaySeconds(3);
  expect(mobTimer.secondsRemainingString).toEqual("05:56");
});

test("After time expires, state should be Ready", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 1;
  mobTimer.start();
  mobTimer.delaySeconds(61);
  expect(mobTimer.status).toEqual(Status.Ready);
});

test("After time expires and timer is started, time remaining should be full amount of time", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 1;
  mobTimer.start();
  mobTimer.delaySeconds(1);
  expect(mobTimer.secondsRemaining).toEqual(59);
  mobTimer.delaySeconds(61);
  expect(mobTimer.secondsRemaining).toEqual(0);
  mobTimer.start();
  expect(mobTimer.secondsRemaining).toEqual(60);
  mobTimer.start();
  mobTimer.delaySeconds(1);
  expect(mobTimer.secondsRemaining).toEqual(59);
});

test("After time expires, seconds remaining should be 0", () => {
  const mobTimer = new MobTestTimer();
  mobTimer.durationMinutes = 1;
  mobTimer.start();
  mobTimer.delaySeconds(65);
  expect(mobTimer.secondsRemainingString).toEqual("00:00");
});

test("After time expires, elapse time raises specified event", async () => {
  const mobTimer = new MobTimer();
  let expireFuncWasCalled = false;
  mobTimer.timerExpireFunc = () => {expireFuncWasCalled = true;};
  const durationSeconds = 0.2;
  mobTimer.durationMinutes = secondsToMinutes(durationSeconds);
  mobTimer.start();
  const toleranceSeconds = 0.1;
  await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds);
  expect(expireFuncWasCalled).toBe(true);
});


function minutesToSeconds(minutes: number) : number {
  return TimeUtils.minutesToSeconds(minutes);
}

function secondsToMinutes(seconds: number): number {
  return TimeUtils.secondsToMinutes(seconds);
}
