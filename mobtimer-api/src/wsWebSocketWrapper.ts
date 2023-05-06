import WebSocket from "ws";
import { IWebSocketWrapper } from "./iWebSocketWrapper";

export class WSWebSocketWrapper implements IWebSocketWrapper {
  private _webSocket: WebSocket;

  constructor(url: string) {
    this._webSocket = new WebSocket(url);
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

  public set onmessageReceived(handler: (message: { data: any }) => void) {
    this._webSocket.on("message", (message) => {
      handler({ data: message });
    });
  }
}
