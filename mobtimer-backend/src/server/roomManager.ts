import { Room } from "./room";
import WebSocket from "ws";
import { MobTimer } from "../mobTimer";
import { Action } from "mobtimer-api";

export class RoomManager {
  /*
    todo:
    - Review broadcast functions
    - Decide whether this should be a module or class
    */

  private static _roomsByMobName: Map<string, Room> = new Map();
  private static _roomsBySocket: Map<WebSocket, Room> = new Map();

  private static _getRoom(key: string | WebSocket): Room | undefined {
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

  static getOrRegisterRoom(mobName: string, socket: WebSocket) {
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
    // todo: rename timerExpireFunc
    mobTimer.timerExpireFunc = () =>
      RoomManager.broadcastToMob(
        "dummy", // todo: define id
        mobTimer as MobTimer,
        Action.Expired
      );
    const room = { mobTimer, sockets: new Set<WebSocket>() };
    RoomManager._roomsByMobName.set(mobName, room);
    RoomManager._joinRoom(room, socket);
    return room;
  }

  // todo: consider if this really belongs here; it's pretty different from the other methods
  static broadcastToMob(id: string, mobTimer: MobTimer, action: Action) {
    const mobTimerResponse = {
      id,
      actionInfo: { action: action },
      mobState: mobTimer.state,
    };
    let message = JSON.stringify(mobTimerResponse);
    const sockets = RoomManager.getSocketsForMob(mobTimer.state.mobName);
    RoomManager._broadcast(sockets, message);
  }

  // todo: consider changing sockets parameter to room (from which the sockets can be retrieved), or if making totally generic (something else)
  private static _broadcast(
    sockets: Set<WebSocket> | undefined,
    message: string
  ) {
    if (!sockets) {
      return;
    }
    sockets.forEach((socketClient: WebSocket) => {
      socketClient.send(message);
    });
  }

  static resetRooms() {
    RoomManager._roomsByMobName.clear();
    RoomManager._roomsBySocket.clear();
  }
}
