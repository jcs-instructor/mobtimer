import { w3cwebsocket as W3CWebSocket } from "websocket";
import WebSocket from "ws";
import { WebSocketType } from "./webSocketType";

interface WebSocketWrapper {
  readyState: number;
  send: (message: string) => void;
  close: () => void;
  OPEN: number;
  CLOSED: number;
  onmessage: (message: {data: string}) => void;
}

class W3CWebSocketWrapper extends W3CWebSocket {
  constructor(url: string) {
    super(url);
  }

  onmessage = (message: any) => {
    this.onmessage(message);
  }
    
}

// class W3CWebSocketWrapper implements WebSocketWrapper {
//   private _webSocket: WebSocketType;

//   constructor(url: string) {
//     this._webSocket = new W3CWebSocket(url);
//   }

//   get readyState(): number {
//     return this._webSocket.readyState;
//   }

//   send(message: string): void {
//     this._webSocket.send(message);
//   }

//   close(): void {
//     this._webSocket.close();
//   }

//   get OPEN(): number {
//     return this._webSocket.OPEN;
//   }

//   get CLOSED(): number {
//     return this._webSocket.CLOSED;
//   }

//   onmessage = (message: {data: string}) => {
//     this._webSocket.onmessage(message);
//   }
// }

// class WebSocketWrapperWS implements WebSocketWrapper {
//   private _webSocket: WebSocket;

//   constructor(url: string) {
//     this._webSocket = new WebSocket(url);
//   }

//   get readyState(): number {
//     return this._webSocket.readyState;
//   }

//   send(data: any): void {
//     this._webSocket.send(data);
//   }

//   close(): void {
//     this._webSocket.close();
//   }

//   get OPEN(): number {
//     return WebSocket.OPEN;
//   }

//   get CLOSED(): number {
//     return WebSocket.CLOSED;
//   }

//   onmessage(callback: (event: any) => void): void {
//     this._webSocket.on("message", (data: any) => {
//       const event = new MessageEvent("message", { data });
//       callback(event);
//     });
//   }
// }

// MobSocketClient class remains unchanged...

export { WebSocketWrapper, W3CWebSocketWrapper }; //, WebSocketWrapperWS
