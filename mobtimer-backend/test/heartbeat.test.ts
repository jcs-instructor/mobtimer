import { MockHeartbeat } from "../src/server/mockHeartbeat";

describe.skip("Heartbeat tests", () => {

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
