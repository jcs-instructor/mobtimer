import { Room } from "./room";
import WebSocket from "ws";
import { MobTimer } from "../mobTimer";
import { Action } from "./action";

export class RoomManager {
    
    /*
    todo:
    - Review broadcast functions
    - Review this file and mobSocketServer.ts - how do they look? anything else to move? rename?
    - Some cases change mob to room, but not all.
    - Decide whether this should be a module or class
    */

    private static _rooms: Map<string, Room> = new Map();
    private static _mobTimers: Map<WebSocket, MobTimer> = new Map();

    static getMobTimer(mobName: string): MobTimer | undefined {
        return RoomManager._rooms.get(mobName)?.mobTimer;
    }

    static getMobTimerFromSocket(socket: WebSocket) {
      const mobTimer = RoomManager._mobTimers.get(socket); 
      return mobTimer;
    }
    
    static getSocketsForSingleMob(mobName: string): Set<WebSocket> | undefined {
        return RoomManager._rooms.get(mobName)?.sockets;
    }

    static getOrRegisterRoom(
        wss: WebSocket.Server,
        mobName: string,
        socket: WebSocket
    ) {
        let mobTimer = RoomManager.getMobTimer(mobName);
        if (!mobTimer) {
            // todo extract these three lines into a create room function
            mobTimer = new MobTimer(mobName);
            mobTimer.expireFunc = () =>
                RoomManager.broadcastToClients(mobTimer as MobTimer, Action.Expired);
            RoomManager._rooms.set(mobName, { mobTimer: mobTimer, sockets: new Set<WebSocket> });
        }
        RoomManager._rooms.get(mobName)?.sockets.add(socket);
        RoomManager._mobTimers.set(socket, mobTimer);

        return mobTimer;
    }
    
    static broadcastToClients(
        mobTimer: MobTimer,
        action: Action
      ) {
        let response = JSON.stringify({
          actionInfo: { action: action },
          mobState: mobTimer.state,
        });
        RoomManager.broadcast(mobTimer.state.mobName, response);
      }
      
      static broadcast(mobName: string, messageToClients: string) {
        const sockets = RoomManager.getSocketsForSingleMob(mobName);
        if (!sockets) {
          return;
        }
        sockets.forEach((socketClient: WebSocket) => {
          socketClient.send(messageToClients);
        });
      }

      static resetRooms() {
        RoomManager._rooms.clear();
        RoomManager._mobTimers.clear();
      }
}
      
