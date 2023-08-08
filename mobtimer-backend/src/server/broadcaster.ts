import { Action, MobTimer, MobTimerResponses } from "mobtimer-api";
import { RoomManager } from "./roomManager";

export class Broadcaster {
    static broadcastToMob(mobTimer: MobTimer, action: Action) {
    const mobTimerResponse = {
      actionInfo: { action: action },
      mobState: mobTimer.state,
      //logInfo: mobTimer.getLogInfo(),
    } as MobTimerResponses.SuccessfulResponse;
    let message = JSON.stringify(mobTimerResponse);
    const sockets = RoomManager.getSocketsForMob(mobTimer.state.mobName);
    Broadcaster._broadcast(sockets, message);
    }

    static broadcastResponseToMob(mobTimerResponse: MobTimerResponses.SuccessfulResponse, mobName: string) {
      let message = JSON.stringify(mobTimerResponse);
      const sockets = RoomManager.getSocketsForMob(mobName);
      Broadcaster._broadcast(sockets, message);
    }
    // todo: consider changing sockets parameter to room (from which the sockets can be retrieved), or if making totally generic (something else)
    private static _broadcast(
      sockets: Set<WebSocket> | undefined,
      message: string
    ) {
      if (!sockets) {
        return;
      }
      console.log(`broadcasting message: ${Date.now()} ${message}`);
      sockets.forEach((socketClient: WebSocket) => {
        socketClient.send(message);
      });
    }
  }