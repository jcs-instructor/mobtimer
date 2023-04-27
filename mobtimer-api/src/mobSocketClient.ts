import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { WebSocketType } from "./webSocketType";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { IWebSocketWrapper } from "./iWebSocketWrapper";

class MobSocketClient {
  private _webSocket: IWebSocketWrapper;

  constructor(webSocket: IWebSocketWrapper) {
    this._webSocket = webSocket;
  }

  static openSocketSync(webSocket: IWebSocketWrapper): MobSocketClient {
    const mobSocketClient = new MobSocketClient(webSocket);
    return mobSocketClient;
  }

  static async openSocket(webSocket: IWebSocketWrapper): Promise<MobSocketClient> {
    const mobSocketClient = new MobSocketClient(webSocket);
    await MobSocketClient.waitForSocketState(
      mobSocketClient.webSocket,
      mobSocketClient.webSocket.OPEN
    );
    return mobSocketClient;
  }

  /**
   * Forces a process to wait until the socket's `readyState` becomes the specified value.
   * @param socket The socket whose `readyState` is being watched
   * @param state The desired `readyState` for the socket
   */
  static waitForSocketState(
    socket: { readyState: number },
    state: number
  ): Promise<void> {
    const client = this;
    return new Promise(function (resolve) {
      const timeout = setTimeout(function () {
        if (socket.readyState === state) {
          resolve();
        } else {
          MobSocketClient.waitForSocketState(socket, state).then(resolve);
        }
      });
      // todo: timeout.unref() fails when running from frontend; why?
      // timeout.unref();
    });
  }

  public waitForSocketState(state: number): Promise<void> {
    return MobSocketClient.waitForSocketState(this._webSocket, state);
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

  addParticipant(name: string) {
    this._sendJSON({
      action: Action.AddParticipant,
      name: name,
    } as MobTimerRequests.AddParticipantRequest);
  }

  rotateParticipants() {
    this._sendJSON({
      action: Action.RotateParticipants,
    } as MobTimerRequests.RotateParticipantsRequest);
  }

  start() {
    console.log("sending start request");
    this._sendJSON({ action: Action.Start } as MobTimerRequests.StartRequest);
  }

  pause() {
    console.log("sending pause request");
    this._sendJSON({ action: Action.Pause } as MobTimerRequests.PauseRequest);
  }

  reset() {
    console.log("sending reset request");
    this._sendJSON({ action: Action.Reset } as MobTimerRequests.ResetRequest);
  }

  private _sendJSON(request: MobTimerRequests.MobTimerRequest) {
    this._webSocket.send(JSON.stringify(request));
  }

  public get webSocket(): IWebSocketWrapper {
    return this._webSocket;
  }

  async closeSocket() {
    this.webSocket.close();
    await this.waitForSocketState(this.webSocket.CLOSED);
  }
}

export { MobSocketClient };
