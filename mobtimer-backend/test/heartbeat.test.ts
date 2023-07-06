import { TimeUtils } from "mobtimer-api";
import { Heartbeat } from "../src/server/heartbeat";

jest.useFakeTimers();

describe("Heartbeat tests", () => {

  // callback is not executed if elapsed time < wakeup time
  // callback is executed once if elapsed time >= wakeup time
  // callback is executed three times if elapsed time > 3*wakeup time
  // Set up: wakeup time is 15, kill time is 60, number of repeats = 4
  // if elapsed time is 120: wakeup interval is killed (? test for this) and callback is called 4 times
  // if activity occurs at 50 and then another 40 seconds elapse, callback is called 6 times
  // if elapsed time is 120, an activity occurs, and then 30 seconds elapses, callback is called 6 times

  test.each([
    { heartbeatDurationMinutes: 14, delayMinutes: 1, expectedCallbacks: 0 },
    { heartbeatDurationMinutes: 14, delayMinutes: 16, expectedCallbacks: 1 },
    { heartbeatDurationMinutes: 14, delayMinutes: 30, expectedCallbacks: 2 },
  ])(
    "Duration: $heartbeatDurationMinutes min, Delay: $delayMinutes min => Calls: $expectedCallbacks",
    async ({ heartbeatDurationMinutes, delayMinutes, expectedCallbacks }) => {
      const callback = jest.fn();
      const heartbeat = new Heartbeat(heartbeatDurationMinutes, callback);
      heartbeat.start();
      advanceTimersByMinutes(delayMinutes);
      expect(callback).toBeCalledTimes(expectedCallbacks);
    }
  ); 
});

function advanceTimersByMinutes(delayMinutes: number): number {
  jest.advanceTimersByTime(TimeUtils.minutesToMilliseconds(delayMinutes));
  return delayMinutes;
}