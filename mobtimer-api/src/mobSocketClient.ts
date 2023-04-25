import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { WebSocketType } from "./webSocketType";
import { w3cwebsocket as W3CWebSocket } from "websocket";

/*

interface WebSocketWrapper {
  readyState: number;
  send: (data: any) => void;
  close: () => void;
  OPEN: number;
  CLOSED: number;
  onMessage: (callback: (event: MessageEvent) => void) => void;
}

class W3CWebSocketWrapper implements WebSocketWrapper {
  private _webSocket: W3CWebSocket;

  constructor(url: string) {
    this._webSocket = new W3CWebSocket(url);
  }

  get readyState(): number {
    return this._webSocket.readyState;
  }

  send(data: any): void {
    this._webSocket.send(data);
  }

  close(): void {
    this._webSocket.close();
  }

  get OPEN(): number {
    return this._webSocket.OPEN;
  }

  get CLOSED(): number {
    return this._webSocket.CLOSED;
  }

  onMessage(callback: (event: MessageEvent) => void): void {
    this._webSocket.onmessage = callback;
  }
}

class WebSocketWrapperWS implements WebSocketWrapper {
  private _webSocket: WebSocket;

  constructor(url: string) {
    this._webSocket = new WebSocket(url);
  }

  get readyState(): number {
    return this._webSocket.readyState;
  }

  send(data: any): void {
    this._webSocket.send(data);
  }

  close(): void {
    this._webSocket.close();
  }

  get OPEN(): number {
    return WebSocket.OPEN;
  }

  get CLOSED(): number {
    return WebSocket.CLOSED;
  }

  onMessage(callback: (event: MessageEvent) => void): void {
    this._webSocket.on("message", (data: any) => {
      const event = new MessageEvent("message", { data });
      callback(event);
    });
  }
}

// MobSocketClient class remains unchanged...

export { MobSocketClient, W3CWebSocketWrapper, WebSocketWrapperWS };

*/

class MobSocketClient {
  private _webSocket: WebSocketType;

  constructor(webSocket: WebSocketType) {
    this._webSocket = webSocket;
  }

  static openSocketSync(url: string): MobSocketClient {
    console.log("opening socket", url);
    const socket = new W3CWebSocket(url);
    const mobSocketClient = new MobSocketClient(socket);
    return mobSocketClient;
  }

  static async openSocket(url: string): Promise<MobSocketClient> {
    const socket = new W3CWebSocket(url);
    const mobSocketClient = new MobSocketClient(socket);
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

  public get webSocket(): WebSocketType {
    return this._webSocket;
  }

  async closeSocket() {
    this.webSocket.close();
    await this.waitForSocketState(this.webSocket.CLOSED);
  }
}

export { MobSocketClient };
