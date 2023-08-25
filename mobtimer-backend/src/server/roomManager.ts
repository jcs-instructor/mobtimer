import { Room } from "./room";
import WebSocket from "ws";
import { MobTimer } from "mobtimer-api";
import { Action } from "mobtimer-api";
import { Broadcaster } from "./broadcaster";

type WebSocketOrAny = WebSocket | any;

export class RoomManager {
  /*
    todo:
    - Review broadcast functions
    - Decide whether this should be a module or class
    */

  private static _roomsByMobName: Map<string, Room> = new Map();
  private static _roomsBySocketOrAny: Map<WebSocketOrAny, Room> = new Map();

  private static _getRoom(key: string | WebSocketOrAny): Room | undefined {
    if (typeof key === "string") {
      return RoomManager._roomsByMobName.get(key);
    } else {
      return RoomManager._roomsBySocketOrAny.get(key);
    }
  }

  static getMobTimer(mobName: string): MobTimer | undefined {
    return this._getRoom(mobName)?.mobTimer;
  }

  static getMobTimerFromSocket(socket: WebSocketOrAny) {
    const mobTimer = RoomManager._getRoom(socket)?.mobTimer;
    return mobTimer;
  }

  static getSocketsForMob(mobName: string): Set<WebSocketOrAny> | undefined {
    return RoomManager._getRoom(mobName)?.sockets;
  }

  static getOrRegisterRoom(mobName: string, socket: WebSocketOrAny) { 
    let room = RoomManager._getRoom(mobName);
    if (room) {
      RoomManager._joinRoom(room, socket);
    } else {
      room = RoomManager._createAndJoinRoom(mobName, socket);
    }

    return room.mobTimer;
  }

  private static _joinRoom(room: Room, socket: WebSocketOrAny) {
    room.sockets.add(socket);
    RoomManager._roomsBySocketOrAny.set(socket, room);
  }

  private static _createAndJoinRoom(mobName: string, socket: WebSocketOrAny) {
    const mobTimer = new MobTimer(mobName);
    // todo: rename timerExpireFunc
    mobTimer.timerExpireFunc = () =>
      Broadcaster.broadcastToMob(mobTimer as MobTimer, Action.Expired);
    const room = { mobTimer, sockets: new Set<WebSocketOrAny>() };
    RoomManager._roomsByMobName.set(mobName, room);
    RoomManager._joinRoom(room, socket);
    return room;
  }

  static resetRooms() {
    RoomManager._roomsByMobName.clear();
    RoomManager._roomsBySocketOrAny.clear();
  }
}
