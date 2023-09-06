import { w3cwebsocket as W3CWebSocket } from "websocket";
import { IClientSocket } from "./iClientSocket";

export class W3CClientSocket implements IClientSocket {
  private _webSocket: W3CWebSocket;

  constructor(url: string, webSocket?: W3CWebSocket) {
    if (url) this._webSocket = new W3CWebSocket(url);
    else {
      this._webSocket = webSocket!;
    }
  }

  public get socketState(): number {
    return this._webSocket.readyState;
  }

  public sendToServer(message: string): void {
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

  public set onmessageReceived(handler: (message: { data: any }) => void) {
    this._webSocket.onmessage = handler;
  }
}
