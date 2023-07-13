import { startMobServer } from "../src/server/mobSocketServer";
import { Counter } from "../src/Counter";
import { MobState, MobTimer } from "mobtimer-api";
import { Status, TimeUtils, Action } from "mobtimer-api";
import * as http from "http";
import WebSocket from "ws";
import { RoomManager } from "../src/server/roomManager";
import { MobSocketTestClient, MobSocketClient } from "mobtimer-api";
import { W3CWebSocketWrapper, WSWebSocketWrapper } from "mobtimer-api";

//jest.useFakeTimers();

describe.only("WebSocket Server", () => {
  let _server: { httpServer: http.Server; wss: WebSocket.Server };
  const _mobName1 = "awesome-team";
  const _mobName2 = "good-team";
  const port = 4000 + Number(process.env.JEST_WORKER_ID);
  const url = `ws://localhost:${port}`;
  const toleranceSeconds = 0.05; // used to account for extra time it may take to complete timeout for time expired
  let heartbeatCallbackFunc = () => {};
  const counter = new Counter();

  beforeEach(async () => {
    counter.counter = 0;
    heartbeatCallbackFunc = () => counter.counter++;
    _server = await startMobServer(port, heartbeatCallbackFunc, 
      { heartbeatDurationMinutes: TimeUtils.secondsToMinutes(0.25), 
        heartbeatMaxInactivityMinutes: TimeUtils.secondsToMinutes(0.6)
      }
    );
  });

  afterEach(async () => {
    RoomManager.resetRooms();
    // todo: Refactor to change return type for the startMobServer method to be a class with one exposed close method (so don't have to close both httpServer and wss separately from the consumer).
    await _server.wss.close();
    await _server.httpServer.close();
  });

  /* todo: Create heartbeat integration test, e.g.: 
  look at the heartbeat.test.ts file & just replace direct 
  calls to the heartbeat object with client calls
  x1. instead of heartbeat.start(), do:
  x- client.joinMob
  x- client.start  
  x2. advance time 120 min
  x3. instead of heartbeat.restart(), do:
  x- client.pause  
  x4. advance time 30 min

  5. expect 6 heartbeats
  */
  test.only("Heartbeat integration test", async () => {

    const client = await openSocketAlternative(url);
    await client.joinMob(_mobName1);
    await client.start();
    await TimeUtils.delaySeconds(0.9);
    await client.pause();
    await TimeUtils.delaySeconds(0.4);
    await cleanUp(client);

    expect (counter.counter).toEqual(3);
  });

});

async function openSocketAlternative(url: string) {
  return await MobSocketTestClient.waitForOpenSocket(
    new WSWebSocketWrapper(url)
  );
}

async function cleanUp(client: MobSocketTestClient) {
  await client.waitForLastResponse();
  await client.closeSocket();
}

