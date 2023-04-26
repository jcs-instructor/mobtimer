import { w3cwebsocket as W3CWebSocket } from "websocket";
import WebSocket from "ws";
import { WebSocketType } from "./webSocketType";

interface IWebSocketWrapper {
  readyState: number;
  send: (message: string) => void;
  close: () => void;
  OPEN: number;
  CLOSED: number;
  onmessage: (message: any) => void;
}

class W3CWebSocketWrapper implements IWebSocketWrapper {
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
  
  public set onmessage(handler: (message: {data: string}) => void) {
    this._webSocket.onmessage = handler;
  }    
}

class WSWebSocketWrapper implements IWebSocketWrapper {
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
    this._webSocket.on("message", handler);
  }
}

export { IWebSocketWrapper, W3CWebSocketWrapper, WSWebSocketWrapper }; 
