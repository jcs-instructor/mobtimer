import { w3cwebsocket as W3CWebSocket } from "websocket";
import { WebSocketType } from "./webSocketType";
import { IWebSocketWrapper } from "./iWebSocketWrapper";


export class W3CWebSocketWrapper implements IWebSocketWrapper {
  private _webSocket: WebSocketType;

  constructor(url: string) {
    this._webSocket = new W3CWebSocket(url);
  }

  public get readyState(): number {
    return this._webSocket.readyState;
  }

  public send(message: string): void {
    this._webSocket.send(message);
  }

  public close(): void {
    this._webSocket.close();
  }

  public get OPEN(): number {
    return this._webSocket.OPEN;
  }

  public get CLOSED(): number {
    return this._webSocket.CLOSED;
  }

  public set onmessage(handler: (message: { data: string; }) => void) {
    this._webSocket.onmessage = handler;
  }
}
