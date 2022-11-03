import { w3cwebsocket as W3CWebSocket } from "websocket";
import { convertToMobTimerResponse, waitForSocketState } from "./testUtils";
import { MobTimerResponse } from "mobtimer-api";
import * as MobTimerRequests from "mobtimer-api";
import { WebSocketType } from "./webSocketType";

class MobSocketClient {
   
  private _responses: string[] = [];
  private _echoReceived: boolean = false;
  webSocket: WebSocketType;

  constructor(webSocket: WebSocketType) {
    this.webSocket = webSocket;
    this.webSocket.onmessage = (message) => {
      const responseObject = convertToMobTimerResponse(message.data);
      if (responseObject.actionInfo.action === MobTimerRequests.Action.Echo) {
        this._echoReceived = true;
      }
      else {
        this._responses.push(message.data);
      }
    };
  }
  
  sendEchoRequest() {
    const request = MobTimerRequests.echoRequest();
    this.webSocket.send(request);
    return request;
  }

  joinMob(mobName: string) {
    const request = MobTimerRequests.joinRequest(mobName);
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

  deleteEchoResponse() {
    this._responses.forEach((response, index) => { 
      // todo: if (response === ...) 
    });
  }

  async closeSocket() {
    this.webSocket.close();
    await waitForSocketState(this.webSocket, this.webSocket.CLOSED);
  }
}

export { MobSocketClient };