import { MockHeartbeat } from "../src/server/mockHeartbeat";

describe("Heartbeat tests", () => {
    test("Heartbeat does nothing if time has not been reached", async () => {
        let counter = 0;
        const heartbeat = new MockHeartbeat(14, ()=> { counter++ });
        heartbeat.mockDelayMinutes(1);
        expect(counter).toEqual(0);
      });
});
