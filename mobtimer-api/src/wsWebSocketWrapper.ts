import WebSocket from "ws";
import { IWebSocketWrapper } from "./iWebSocketWrapper";

export class WSWebSocketWrapper implements IWebSocketWrapper {
  private _webSocket: WebSocket;

  constructor(url: string) {
    this._webSocket = new WebSocket(url);
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

  public set onmessage(handler: (message: any) => void) {
    this._webSocket.on("message", (message) => {
      handler({ data: message });
    });
  }
}
