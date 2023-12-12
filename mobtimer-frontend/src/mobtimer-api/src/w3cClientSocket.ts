import { w3cwebsocket as W3CWebSocket } from "websocket";
import { IClientSocket } from "./iClientSocket";

export class W3CClientSocket implements IClientSocket {
  private _webSocket: W3CWebSocket;
  CONNECTING_CODE: number;
  OPEN_CODE: number;
  CLOSING_CODE: number;
  CLOSED_CODE: number;
  id: string | undefined;

  constructor(url: string, webSocket?: W3CWebSocket) {
    if (url) this._webSocket = new W3CWebSocket(url);
    else {
      this._webSocket = webSocket!;
    }
    this.CONNECTING_CODE = this._webSocket.CONNECTING;
    this.OPEN_CODE = this._webSocket.OPEN;
    this.CLOSING_CODE = this._webSocket.CLOSING;
    this.CLOSED_CODE = this._webSocket.CLOSED;
  }

  public sendToServer(message: string): void {
    console.log("sending message", message, this.id)
    this._webSocket.send(message);
  }

  public set onmessageReceived(handler: (message: { data: any }) => void) {
    this._webSocket.onmessage = handler;
  }

  public closeSocket(): void {
    this._webSocket.close();
  }

  public get socketState(): number {
    return this._webSocket.readyState;
  }
}
