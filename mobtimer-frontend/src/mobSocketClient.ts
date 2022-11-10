import { w3cwebsocket as W3CWebSocket } from "websocket";
import { waitForSocketState } from "./testUtils";
import { joinRequest } from "mobtimer-api";
import { MobTimerResponse } from "mobtimer-api";
import { mobTimerRequests } from "mobtimer-api";

class MobSocketClient {
  private _responses: string[] = [];
  webSocket: W3CWebSocket = new W3CWebSocket("ws://localhost:0000");

  constructor(url: string) {
    this.webSocket = new W3CWebSocket(url);
    this.webSocket.onmessage = (message) => {
      this._responses.push(message.toString());
    };
  }

  echo() {
    const request = mobTimerRequests.echoRequest();
    this.webSocket.send(request);
  }

  joinMob(mobName: string) {
    const request = joinRequest(mobName);
    this.webSocket.send(request);
  }

  update(durationMinutes: number) {
    const request = mobTimerRequests.updateRequest(durationMinutes);
    this.webSocket.send(request);
  }

  start() {
    const request = mobTimerRequests.startRequest();
    this.webSocket.send(request);
  }

  pause() {
    const request = mobTimerRequests.pauseRequest();
    this.webSocket.send(request);
  }

  resume() {
    const request = mobTimerRequests.resumeRequest();
    this.webSocket.send(request);
  }

  public get lastResponse(): MobTimerResponse {
    return JSON.parse(this._responses.at(-1) || "") as MobTimerResponse;
  }

  public get responses(): string[] {
    return [...this._responses];
  }

  async closeSocket() {
    this.webSocket.close();
    await waitForSocketState(this.webSocket, this.webSocket.CLOSED);
  }
}

export { MobSocketClient };
