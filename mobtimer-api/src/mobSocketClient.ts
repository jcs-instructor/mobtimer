import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";
import { waitForSocketState } from "./testUtils";
import { joinRequest, MobTimerRequest } from "./mobTimerRequests";
import { MobTimerResponse } from "./mobTimerResponse";
import * as MobTimerRequests from "./mobTimerRequests";

class MobSocketClient extends W3CWebSocket {
  private _responses: string[] = [];

  constructor(url: string) {
    super(url);
    this.onmessage = (message) => {
      this._responses.push(message.toString());
    };
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
    return JSON.parse(this._responses.at(-1) || "") as MobTimerResponse;
  }

  public get responses(): string[] {
    return [...this._responses];
  }

  async closeSocket() {
    this.close();
    await waitForSocketState(this, this.CLOSED);
  }
}

export { MobSocketClient };
