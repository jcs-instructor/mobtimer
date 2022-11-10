import { convertToMobTimerResponse, waitForSocketState } from "./testUtils";
import { MobTimerResponse } from "./mobTimerResponse";
import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { WebSocketType } from "./webSocketType";

class MobSocketClient {
  private _responses: string[] = [];
  private _echoReceived: boolean = false;
  webSocket: WebSocketType;

  constructor(webSocket: WebSocketType) {
    this.webSocket = webSocket;
    this.webSocket.onmessage = (message) => {
      const responseObject = convertToMobTimerResponse(message.data);
      if (responseObject.actionInfo.action === Action.Echo) {
        this._echoReceived = true;
      } else {
        this._responses.push(message.data);
      }
    };
  }

  sendEchoRequest() {
    this.sendJSON({ action: Action.Echo } as MobTimerRequests.EchoRequest);
  }

  joinMob(mobName: string) {
    const request = MobTimerRequests.joinRequest(mobName);
    this.webSocket.send(request);
  }

  update(durationMinutes: number) {
    const request = MobTimerRequests.updateRequest(durationMinutes);
    this.webSocket.send(request);
  }

  start() {
    this.sendJSON({ action: Action.Start } as MobTimerRequests.StartRequest);
  }

  pause() {
    this.sendJSON({ action: Action.Pause } as MobTimerRequests.PauseRequest);
  }

  resume() {
    this.sendJSON({ action: Action.Resume } as MobTimerRequests.ResumeRequest);
  }

  private sendJSON(request: MobTimerRequests.MobTimerRequest) {
    this.webSocket.send(JSON.stringify(request));
  }

  public get lastResponse(): MobTimerResponse {
    return JSON.parse(this._responses.at(-1) || "") as MobTimerResponse;
  }

  public get responses(): string[] {
    return [...this._responses];
  }

  public get echoReceived(): boolean {
    return this._echoReceived;
  }

  async closeSocket() {
    this.webSocket.close();
    await waitForSocketState(this.webSocket, this.webSocket.CLOSED);
  }
}

export { MobSocketClient };
