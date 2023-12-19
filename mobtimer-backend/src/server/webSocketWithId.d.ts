import WebSocket from "ws";
export class WebSocketWithId extends WebSocket {
  id: string | undefined;
}
