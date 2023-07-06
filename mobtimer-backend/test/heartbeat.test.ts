import { MockHeartbeat } from "../src/server/mockHeartbeat";

describe.skip("Heartbeat tests", () => {

  // callback is not executed if elapsed time < wakeup time
  // callback is executed once if elapsed time >= wakeup time
  // callback is executed three times if elapsed time > 3*wakeup time
  // Set up: wakeup time is 15, kill time is 60, number of repeats = 4
  // if elapsed time is 120: wakeup interval is killed (? test for this) and callback is called 4 times
  // if activity occurs at 50 and then another 40 seconds elapse, callback is called 6 times
  // if elapsed time is 120, an activity occurs, and then 30 seconds elapses, callback is called 6 times

  test("Heartbeat does nothing if time has not been reached", async () => {
    let counter = 0;
    const heartbeat = new MockHeartbeat(14, () => {
      counter++;
    });
    heartbeat.mockDelayMinutes(1);
    expect(counter).toEqual(0);
  });
  test("Heartbeat beats once after one time period has elapsed", async () => {
    let counter = 0;
    const heartbeat = new MockHeartbeat(14, () => {
      counter++;
    });
    heartbeat.mockDelayMinutes(15);
    expect(counter).toEqual(1);
  });

  test("Heartbeat beats once after one time period has elapsed", async () => {
    let counter = 0;
    const heartbeat = new MockHeartbeat(14, () => {
      counter++;
    });
    heartbeat.mockDelayMinutes(30);
    expect(counter).toEqual(2);
  });
  
});
