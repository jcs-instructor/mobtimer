import { convertToMobTimerResponse, waitForSocketState } from "./testUtils";
import { SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { WebSocketType } from "./webSocketType";

class MobSocketClient {
  private _successfulResponses: string[] = [];
  private _echoReceived: boolean = false;
  webSocket: WebSocketType;

  constructor(webSocket: WebSocketType) {
    this.webSocket = webSocket;
    this.webSocket.onmessage = (message) => {
      const responseObject = convertToMobTimerResponse(message.data);
      if (responseObject.actionInfo.action === Action.Echo) {
        this._echoReceived = true;
      } else {
        // todo: put errorResponses somewhere else (not in successfulResponses); maybe errorReceived boolean?
        this._successfulResponses.push(message.data);
      }
    };
  }

  sendEchoRequest() {
    this._sendJSON({ action: Action.Echo } as MobTimerRequests.EchoRequest);
  }

  joinMob(mobName: string) {
    this._sendJSON({ action: Action.Join, mobName } as MobTimerRequests.JoinRequest);
  }

  update(durationMinutes: number) {
    this._sendJSON({ action: Action.Update, value: { durationMinutes } } as MobTimerRequests.UpdateRequest);
  }

  start() {
    this._sendJSON({ action: Action.Start } as MobTimerRequests.StartRequest);
  }

  pause() {
    this._sendJSON({ action: Action.Pause } as MobTimerRequests.PauseRequest);
  }

  resume() {
    this._sendJSON({ action: Action.Resume } as MobTimerRequests.ResumeRequest);
  }

  private _sendJSON(request: MobTimerRequests.MobTimerRequest) {
    this.webSocket.send(JSON.stringify(request));
  }

  public get lastSuccessfulResponse(): SuccessfulResponse {
    return JSON.parse(this._successfulResponses.at(-1) || "") as SuccessfulResponse;
  }

  public get successfulResponses(): string[] {
    return [...this._successfulResponses];
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
