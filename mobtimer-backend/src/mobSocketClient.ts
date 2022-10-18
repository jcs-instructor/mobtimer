import { w3cwebsocket as W3CWebSocket } from "websocket";
import { waitForSocketState } from "./testUtils";
import { joinRequest } from "mobtimer-api";
import { MobTimerResponse } from "mobtimer-api";
import * as MobTimerRequests from "mobtimer-api";

class MobSocketClient {
  private _responses: string[] = [];
  webSocket: W3CWebSocket = new W3CWebSocket("ws://localhost:0000");

  constructor(url: string) {
    this.webSocket = new W3CWebSocket(url);
    this.webSocket.onmessage = (message) => {
      console.log("message woo hoo", message.data as string);
      this._responses.push(message.data as string);
    };
  }

  joinMob(mobName: string) {
    console.log("join mob", mobName);
    const request = joinRequest(mobName);
    this.webSocket.send(request);
    return request;
  }

  update(durationMinutes: number) {
    const request = MobTimerRequests.updateRequest(durationMinutes);
    this.webSocket.send(request);
    return request;
  }

  start() {
    const request = MobTimerRequests.startRequest();
    this.webSocket.send(request);
    return request;
  }

  pause() {
    const request = MobTimerRequests.pauseRequest();
    this.webSocket.send(request);
    return request;
  }

  resume() {
    const request = MobTimerRequests.resumeRequest();
    this.webSocket.send(request);
    return request;
  }

  public get lastResponse(): MobTimerResponse {
    console.log("last response", this._responses.at(-1));
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
