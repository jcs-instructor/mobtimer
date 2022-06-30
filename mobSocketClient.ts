import WebSocket from "ws";
import { waitForSocketState } from "./testUtils";
import { joinRequest, MobTimerRequest } from "./mobTimerRequests";
import { MobTimerResponse } from "./mobTimerResponse";
import * as MobTimerRequests from "./mobTimerRequests";

export interface WebSocketInterface extends WebSocket {}

class MobSocketClient extends WebSocket implements WebSocketInterface {
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
