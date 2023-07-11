import { TimeUtils } from "mobtimer-api";
import { Heartbeat } from "../src/server/heartbeat";

jest.useFakeTimers();

describe.only("Heartbeat tests", () => {
  test("Restart heartbeat before first heartbeat", async () => {
    const callback = jest.fn();
    const heartbeat = new Heartbeat(15, 60, callback);
    heartbeat.start();
    advanceTimersByMinutes(10);
    heartbeat.restart();
    advanceTimersByMinutes(6);
    expect(callback).toBeCalledTimes(0);
  });

  test.each([
    { heartbeatDurationMinutes: 14, delayMinutes: 1, expectedCallbacks: 0 },
    { heartbeatDurationMinutes: 14, delayMinutes: 16, expectedCallbacks: 1 },
    { heartbeatDurationMinutes: 14, delayMinutes: 30, expectedCallbacks: 2 },
  ])(
    "Callback Test - Duration: $heartbeatDurationMinutes min, Delay: $delayMinutes min => Calls: $expectedCallbacks",
    async ({ heartbeatDurationMinutes, delayMinutes, expectedCallbacks }) => {
      const callback = jest.fn();
      const heartbeat = new Heartbeat(heartbeatDurationMinutes, 60, callback);
      heartbeat.start();
      advanceTimersByMinutes(delayMinutes);
      expect(callback).toBeCalledTimes(expectedCallbacks);
    }
  );

  test.each([
    { heartbeatDurationMinutes: 14, delayMinutes: 1, count: 0 },
    { heartbeatDurationMinutes: 14, delayMinutes: 16, count: 1 },
    { heartbeatDurationMinutes: 14, delayMinutes: 30, count: 2 },
  ])(
    "Counter Test - Duration: $heartbeatDurationMinutes min, Delay: $delayMinutes min => Count: $count",
    async ({ heartbeatDurationMinutes, delayMinutes, count: count }) => {
      const heartbeat = new Heartbeat(heartbeatDurationMinutes, 60, () => {});
      heartbeat.start();
      advanceTimersByMinutes(delayMinutes);
      expect(heartbeat.count).toEqual(count);
    }
  );

  test("Restart heartbeat after 3 heartbeats and let run for 2 heartbeats (with no timeout)", async () => {
    // The heartbeat is restarted after 50 min. (3 callbacks so far prior to restart),
    // then another 40 min. later, expect 5 callbacks (i.e., 2 more callbacks added to the prior 3)
    const callback = jest.fn();
    const heartbeat = new Heartbeat(15, 60, callback);
    heartbeat.start();
    advanceTimersByMinutes(50);
    heartbeat.restart();
    advanceTimersByMinutes(40);
    expect(callback).toBeCalledTimes(5);
  });

  test("Restart heartbeat after inactivity timeout", async () => {
    // An activity occurs after 120 min. (4 callbacks so far; both timers would've stopped after 60 min.; on activity, restart both timers);
    // then another 30 min. later, expect 6 callbacks (i.e., 2 more callbacks added to the prior 4)
    const callback = jest.fn();
    const heartbeat = new Heartbeat(15, 60, callback);
    heartbeat.start();
    advanceTimersByMinutes(120);
    heartbeat.restart();
    advanceTimersByMinutes(30);
    expect(callback).toBeCalledTimes(6);
  });

  test("MaxInactivity: 60 min, Duration: 15 min, Delay: 120 min => Calls: 4", async () => {
    const callback = jest.fn();
    const heartbeat = new Heartbeat(15, 60, callback);
    heartbeat.start();
    advanceTimersByMinutes(120);
    expect(callback).toBeCalledTimes(4);
  });
});

function advanceTimersByMinutes(delayMinutes: number): number {
  jest.advanceTimersByTime(TimeUtils.minutesToMilliseconds(delayMinutes));
  return delayMinutes;
}
