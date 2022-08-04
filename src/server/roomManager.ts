import { Room } from "./room";
import WebSocket from "ws";
import { MobTimer } from "../mobTimer";
import { Action } from "./action";

export class RoomManager {
  /*
    todo:
    - Review broadcast functions
    - Decide whether this should be a module or class
    */

  private static _roomsByMobName: Map<string, Room> = new Map();
  private static _roomsBySocket: Map<WebSocket, Room> = new Map();

  private static _getRoom(key: string | WebSocket) : Room | undefined {
    if (typeof key === "string") {
      return RoomManager._roomsByMobName.get(key);
    } else {
      return RoomManager._roomsBySocket.get(key);
    }
  }

  static getMobTimer(mobName: string): MobTimer | undefined {
    return this._getRoom(mobName)?.mobTimer;
  }

  static getMobTimerFromSocket(socket: WebSocket) {
    const mobTimer = RoomManager._getRoom(socket)?.mobTimer;
    return mobTimer;
  }

  static getSocketsForMob(mobName: string): Set<WebSocket> | undefined {
    return RoomManager._getRoom(mobName)?.sockets;
  }

  static getOrRegisterRoom(
    // todo: remove unused param
    wss: WebSocket.Server,
    mobName: string,
    socket: WebSocket
  ) {
    let room = RoomManager._getRoom(mobName);
    if (room) {
      RoomManager._joinRoom(room, socket);
    } else {
      room = RoomManager._createAndJoinRoom(mobName, socket);
    }

    return room.mobTimer;
  }

  private static _joinRoom(room: Room, socket: WebSocket) {
    room.sockets.add(socket);
    RoomManager._roomsBySocket.set(socket, room);
  }

  private static _createAndJoinRoom(mobName: string, socket: WebSocket) {
    const mobTimer = new MobTimer(mobName);
    mobTimer.expireFunc = () =>
      RoomManager.broadcastToClients(mobTimer as MobTimer, Action.Expired);
    const room = { mobTimer, sockets: new Set<WebSocket>() };
    RoomManager._roomsByMobName.set(mobName, room);
    RoomManager._joinRoom(room, socket);
    return room;
  }

  static broadcastToClients(mobTimer: MobTimer, action: Action) {
    let response = JSON.stringify({
      actionInfo: { action: action },
      mobState: mobTimer.state,
    });
    RoomManager.broadcast(mobTimer.state.mobName, response);
  }

  static broadcast(mobName: string, messageToClients: string) {
    const sockets = RoomManager.getSocketsForMob(mobName);
    if (!sockets) {
      return;
    }
    sockets.forEach((socketClient: WebSocket) => {
      socketClient.send(messageToClients);
    });
  }

  static resetRooms() {
    RoomManager._roomsByMobName.clear();
    RoomManager._roomsBySocket.clear();
  }
}
