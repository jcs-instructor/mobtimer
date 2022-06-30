import WebSocket from "ws";
import { waitForSocketState } from "../../test/testUtils";
import { joinRequest, MobTimerRequest } from "../server/mobTimerRequests";
import { MobTimerResponse } from "../server/mobTimerResponse";
import * as MobTimerRequests from "../server/mobTimerRequests";

class MobSocketClient extends WebSocket {
  _receivedResponses: string[] = [];

  constructor(url: string) {
    super(url);
    this.on("message", (data) => {
      this._receivedResponses.push(data.toString());
    });
  }

  joinMob(mobName: string) {
    const request = joinRequest(mobName);
    this.send(request);
  }

  update(durationMinutes: number) {
    const request = MobTimerRequests.updateRequest(durationMinutes);
    this.send(request);
  }

  start() {
    const request = MobTimerRequests.startRequest();
    this.send(request);
  }

  pause() {
    const request = MobTimerRequests.pauseRequest();
    this.send(request);
  }

  resume() {
    const request = MobTimerRequests.resumeRequest();
    this.send(request);
  }

  public get lastResponse(): MobTimerResponse {
    return JSON.parse(this._receivedResponses.at(-1) || "");
  }

  async closeSocket() {
    this.close();
    await waitForSocketState(this, this.CLOSED);
  }
}

export { MobSocketClient };
