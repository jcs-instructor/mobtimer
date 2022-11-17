import { convertToMobTimerResponse, waitForSocketState } from "./testUtils";
import { SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { WebSocketType } from "./webSocketType";

class MobSocketClient {
  private _successfulResponses: string[] = [];
  private _echoReceived: boolean = false;
  private _errorReceived: boolean = false;
  
  // todo: wrap in a property getter
  webSocket: WebSocketType;

  constructor(webSocket: WebSocketType) {
    this.webSocket = webSocket;
    this.webSocket.onmessage = (message) => {
      const responseObject = convertToMobTimerResponse(message.data);
      switch (responseObject.actionInfo.action) {
        case Action.Echo: {
          this._echoReceived = true;
          break;
        }
        case Action.InvalidRequestError: {
          this._errorReceived = true;
          break;
        }
        default: {        
          this._successfulResponses.push(message.data);
          break;
        }
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

  public get errorReceived(): boolean {
    return this._errorReceived;
  }


  async closeSocket() {
    this.webSocket.close();
    await waitForSocketState(this.webSocket, this.webSocket.CLOSED);
  }
}

export { MobSocketClient };
