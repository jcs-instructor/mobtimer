import { w3cwebsocket as W3CWebSocket } from "websocket";
import { waitForSocketState } from "./testUtils";
import { joinRequest } from "mobtimer-api";
import { MobTimerResponse } from "mobtimer-api";
import * as MobTimerRequests from "mobtimer-api";

type webSocketType = {
  onmessage: (message: { data: string }) => void;
  close: () => void;
  CLOSED: number;
  OPEN: number;
  readyState: number;
  send: (message: string) => void;
};
class MobSocketClient {
  private _responses: string[] = [];
  webSocket: webSocketType;

  constructor(webSocket: webSocketType) {
    this.webSocket = webSocket;
    this.webSocket.onmessage = (message) => {      
      this._responses.push(message.data as string);
    };
  }

  joinMob(mobName: string) {
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
