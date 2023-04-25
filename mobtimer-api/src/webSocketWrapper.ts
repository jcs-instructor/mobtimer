import { w3cwebsocket as W3CWebSocket } from "websocket";

interface WebSocketWrapper {
  readyState: number;
  send: (data: any) => void;
  close: () => void;
  OPEN: number;
  CLOSED: number;
  onMessage: (callback: (event: any) => void) => void;
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

  onMessage(callback: (event: any) => void): void {
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
