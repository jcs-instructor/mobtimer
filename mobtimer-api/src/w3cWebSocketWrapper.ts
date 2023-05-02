import { w3cwebsocket as W3CWebSocket } from "websocket";
import { WebSocketType } from "./webSocketType";
import { IWebSocketWrapper } from "./iWebSocketWrapper";

export class W3CWebSocketWrapper implements IWebSocketWrapper {
  private _webSocket: WebSocketType;

  constructor(url: string) {
    this._webSocket = new W3CWebSocket(url);
  }

  public get socketState(): number {
    return this._webSocket.readyState;
  }

  public sendMessage(message: string): void {
    this._webSocket.send(message);
  }

  public closeSocket(): void {
    this._webSocket.close();
  }

  public get OPEN_CODE(): number {
    return this._webSocket.OPEN;
  }

  public get CLOSED_CODE(): number {
    return this._webSocket.CLOSED;
  }

  public set onmessageReceived(handler: (message: { data: string }) => void) {
    this._webSocket.onmessage = handler;
  }
}
