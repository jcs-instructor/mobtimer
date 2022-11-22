import { convertToMobTimerResponse, waitForSocketState } from "./testUtils";
import { SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { WebSocketType } from "./webSocketType";
import { w3cwebsocket as W3CWebSocket } from "websocket";

class MobSocketClient {
  private _successfulResponses: string[] = [];
  private _echoReceived: boolean = false;
  private _errorReceived: boolean = false;
  private _webSocket: WebSocketType;

  constructor(webSocket: WebSocketType) {
    this._webSocket = webSocket;
    this._webSocket.onmessage = (message) => {
      this.createListener(message);
    };
  }

  private createListener(message: { data: string }) {
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
        console.log("pushing message.data", message.data);
        this._successfulResponses.push(message.data);
        break;
      }
    }
  }

  static openSocketSync(url: string): MobSocketClient {
    const socket = new W3CWebSocket(url);
    const mobSocketClient = new MobSocketClient(socket);
    return mobSocketClient;
  }

  static async openSocket(url: string): Promise<MobSocketClient> {
    const socket = new W3CWebSocket(url);
    const mobSocketClient = new MobSocketClient(socket);
    await waitForSocketState(
      mobSocketClient.webSocket,
      mobSocketClient.webSocket.OPEN
    );
    return mobSocketClient;
  }

  sendEchoRequest() {
    this._sendJSON({ action: Action.Echo } as MobTimerRequests.EchoRequest);
  }

  joinMob(mobName: string) {
    this._sendJSON({
      action: Action.Join,
      mobName,
    } as MobTimerRequests.JoinRequest);
  }

  update(durationMinutes: number) {
    this._sendJSON({
      action: Action.Update,
      value: { durationMinutes },
    } as MobTimerRequests.UpdateRequest);
  }

  toggle() {
    console.log("toggle function");
    if (this._successfulResponses.length > 0) {
      console.log(
        "toggle function",
        this.lastSuccessfulResponse.mobState.status
      );
    } else {
      console.log(
        "toggle function",
        "no response 2",
        this._successfulResponses
      );
    }
    this._sendJSON({ action: Action.Toggle } as MobTimerRequests.ToggleRequest);
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
    this._webSocket.send(JSON.stringify(request));
  }

  public get lastSuccessfulResponse(): SuccessfulResponse {
    return JSON.parse(
      this._successfulResponses.at(-1) || ""
    ) as SuccessfulResponse;
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

  public get webSocket(): WebSocketType {
    return this._webSocket;
  }

  async closeSocket() {
    this.webSocket.close();
    await waitForSocketState(this.webSocket, this.webSocket.CLOSED);
  }
}

export { MobSocketClient };
