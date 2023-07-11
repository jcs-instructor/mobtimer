import { TimeUtils } from "mobtimer-api";
import { Heartbeat } from "../src/server/heartbeat";

jest.useFakeTimers();

describe.only("Heartbeat tests", () => {

  // More test examples:
  // Set up: heartbeatDurationMinutes is 15, maxInactivityMinutes is 60 (higher later)
  //  - The heartbeat is restarted after 10 minutes, 6 minutes after that still no callback
  //  - The heartbeat is restarted after 50 min. (3 callbacks so far; restart both timers), then another 40 min. later, expect 5 callbacks (i.e., 2 more callbacks added to the prior 3)
  //  - An activity occurs after 120 min. (4 callbacks so far; both timers would've stopped after 60 min.; on activity, restart both timers); 
  //      then another 30 min. later, expect 6 callbacks (i.e., 2 more callbacks added to the prior 4)  
    test.only("Restart heartbeat", async () => {
      const callback = jest.fn();
      const heartbeat = new Heartbeat(15, 60, callback);
      heartbeat.start();
      advanceTimersByMinutes(10);
      heartbeat.restart();
      advanceTimersByMinutes(6);
      expect(callback).toBeCalledTimes(0);
    }); 

    test("MaxInactivity: 60 min, Duration: 15 min, Delay: 120 min => Calls: 4", async () => {
      const callback = jest.fn();
      const heartbeat = new Heartbeat(15, 60, callback);
      heartbeat.start();
      advanceTimersByMinutes(120);
      expect(callback).toBeCalledTimes(4);
    }); 

  test.each([
    { heartbeatDurationMinutes: 14, delayMinutes: 1, expectedCallbacks: 0 },
    { heartbeatDurationMinutes: 14, delayMinutes: 16, expectedCallbacks: 1 },
    { heartbeatDurationMinutes: 14, delayMinutes: 30, expectedCallbacks: 2 },
  ])(
    "Duration: $heartbeatDurationMinutes min, Delay: $delayMinutes min => Calls: $expectedCallbacks",
    async ({ heartbeatDurationMinutes, delayMinutes, expectedCallbacks }) => {
      const callback = jest.fn();
      const heartbeat = new Heartbeat(heartbeatDurationMinutes, 60, callback);
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