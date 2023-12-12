import WebSocket from "ws";
import { IClientSocket } from "./iClientSocket";

export class WSClientSocket implements IClientSocket {
  private _webSocket: WebSocket;
  CONNECTING_CODE: number;
  OPEN_CODE: number;
  CLOSING_CODE: number;
  CLOSED_CODE: number;

  constructor(url: string, webSocket?: WebSocket) {
    if (url) this._webSocket = new WebSocket(url);
    else {
      this._webSocket = webSocket!;
    }
    this.CONNECTING_CODE = this._webSocket.CONNECTING;
    this.OPEN_CODE = this._webSocket.OPEN;
    this.CLOSING_CODE = this._webSocket.CLOSING;
    this.CLOSED_CODE = this._webSocket.CLOSED;

    if (url) {
      this._webSocket = new WebSocket(url);
    } else {
      this._webSocket = webSocket!;
    }
  }

  public async sendToServer(message: string) {
    this._webSocket.send(message);
  }

  public set onmessageReceived(handler: (message: { data: any }) => void) {
    this._webSocket.on("message", (message) => {
      handler({ data: message });
    });
  }

  public closeSocket(): void {
    this._webSocket.close();
  }

  public get socketState(): number {
    return this._webSocket.readyState;
  }

}
