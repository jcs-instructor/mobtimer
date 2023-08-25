import { MobTimerResponses } from "mobtimer-api";
import { backendUtils } from "./src/server/backendUtils";
import WebSocket from "ws";

export class testBackendUtils extends backendUtils {
  private static _messagesBySocket: Map<{}, String[]> = new Map();

  static getMessages(webSocket: WebSocket | any) {
    return testBackendUtils._messagesBySocket.get(webSocket);
  }

  static getLastMessage(webSocket: WebSocket | any ) {
    return testBackendUtils.getMessages(webSocket)?[-1];
  }
  
  static override sendToSocket(
    webSocket: WebSocket | {},
    request: MobTimerResponses.MobTimerResponse
  ) {
    const messages = testBackendUtils._messagesBySocket.get(webSocket);
    if (messages) {
      messages.push(JSON.stringify(request));
    } else {
      testBackendUtils._messagesBySocket.set(webSocket, [
        JSON.stringify(request),
      ]);
    }
  }
}
