import { Action, MobTimer, MobTimerResponses } from "mobtimer-api";
import { RoomManager } from "./roomManager";

export class Broadcaster {
  static broadcastExpireToMob(mobTimer: MobTimer) {
    const mobTimerResponse = {
      actionInfo: { action: Action.Expired },
      mobState: mobTimer.state,
      //logInfo: mobTimer.getLogInfo(),
    } as MobTimerResponses.SuccessfulResponse;
    let message = JSON.stringify(mobTimerResponse);
    const sockets = RoomManager.getSocketsForMob(mobTimer.state.mobName);
    Broadcaster._broadcastToSockets(sockets, message);
  }

  static broadcastResponseToMob(
    mobTimerResponse: MobTimerResponses.SuccessfulResponse,
    mobName: string
  ) {
    let message = JSON.stringify(mobTimerResponse);
    const sockets = RoomManager.getSocketsForMob(mobName);
    Broadcaster._broadcastToSockets(sockets, message);
  }
  // todo: consider changing sockets parameter to room (from which the sockets can be retrieved), or if making totally generic (something else)
  private static _broadcastToSockets(
    sockets: Set<WebSocket> | undefined,
    message: string
  ) {
    if (!sockets) {
      return;
    }
    sockets.forEach((backendSocket: WebSocket) => {
      Broadcaster.sendToClient(backendSocket, message);
    });
  }

  static sendToClient(backendSocket: WebSocket, message: string) {
    backendSocket.send(message);
  }
}
