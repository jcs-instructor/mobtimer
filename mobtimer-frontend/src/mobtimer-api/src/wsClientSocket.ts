import WebSocket from "ws";
import { IClientSocket } from "./iClientSocket";

export class WSClientSocket implements IClientSocket {
  private _webSocket: WebSocket;

  constructor(url: string, webSocket?: WebSocket) {
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

  public get OPEN_CODE(): number {
    return this._webSocket.OPEN;
  }

  public get CLOSED_CODE(): number {
    return this._webSocket.CLOSED;
  }
}
