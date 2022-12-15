import { convertToMobTimerResponse, waitForSocketState } from "./testUtils";
import { SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { WebSocketType } from "./webSocketType";
import { w3cwebsocket as W3CWebSocket } from "websocket";

class MobSocketClient {
  private _webSocket: WebSocketType;

  constructor(webSocket: WebSocketType) {
    this._webSocket = webSocket;
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

  public get webSocket(): WebSocketType {
    return this._webSocket;
  }

  async closeSocket() {
    this.webSocket.close();
    await waitForSocketState(this.webSocket, this.webSocket.CLOSED);
  }
}

export { MobSocketClient };
