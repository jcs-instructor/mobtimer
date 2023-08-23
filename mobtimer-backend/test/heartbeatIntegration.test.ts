import { backendUtils } from "../src/server/backendUtils";
import { TimeUtils } from "mobtimer-api";
import * as http from "http";
import WebSocket from "ws";
import { RoomManager } from "../src/server/roomManager";
import { MobSocketTestClient } from "mobtimer-api";
import { WSFrontendSocket } from "mobtimer-api";

describe("Heartbeat Integration", () => {
  let _server: { httpServer: http.Server; wss: WebSocket.Server };
  const _mobName1 = "awesome-team";
  const _mobName2 = "good-team";
  const port = 4000 + Number(process.env.JEST_WORKER_ID);
  const url = `ws://localhost:${port}`;
  const toleranceSeconds = 0.05; // used to account for extra time it may take to complete timeout for time expired
  let heartbeatCallbackFunc = () => {};
  const heartbeatDurationSeconds = 0.4; // 0.2 didn't work, 0.24 worked sometimes, 0.25 worked for the few times we tried
  const heartbeatMaxInactivitySeconds = (heartbeatDurationSeconds * 3) + toleranceSeconds; // after 3 heartbeats with no activity, the heartbeat will stop
  const counter = { value: 0 };

  beforeEach(async () => {
    counter.value = 0;
    heartbeatCallbackFunc = () => counter.value++;
    _server = await backendUtils.startMobServer(port, heartbeatCallbackFunc, 
      { heartbeatDurationMinutes: TimeUtils.secondsToMinutes(heartbeatDurationSeconds), 
        heartbeatMaxInactivityMinutes: TimeUtils.secondsToMinutes(heartbeatMaxInactivitySeconds)
      }
    );
  });

  afterEach(async () => {
    RoomManager.resetRooms();
    // todo: Refactor to change return type for the startMobServer method to be a class with one exposed close method (so don't have to close both httpServer and wss separately from the consumer).
    await _server.wss.close();
    await _server.httpServer.close();
  });

  test("Heartbeat integration test", async () => {
    const client = await openSocketAlternative(url);
    await client.joinMob(_mobName1);
    await client.start();
    await TimeUtils.delaySeconds(heartbeatDurationSeconds * 4 + toleranceSeconds);
    // By now we should have 3 heartbeats only (not 4) since we reached the max inactivity timeout
    await client.pause();
    await TimeUtils.delaySeconds(heartbeatDurationSeconds * 2 + toleranceSeconds);
    // By now we should have 5 heartbeats, i.e., the 3 prior heartbeats plus another 2 after the client.pause woke up the heartbeat object
    expect(counter.value).toEqual(5);
    await cleanUp(client);
  });

});

async function openSocketAlternative(url: string) {
  return await MobSocketTestClient.waitForOpenSocket(
    new WSFrontendSocket(url)
  );
}

async function cleanUp(client: MobSocketTestClient) {
  await client.waitForLastResponse();
  await client.closeSocket();
}

