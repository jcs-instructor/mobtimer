import { Room } from "./room";
import WebSocket from "ws";
import { MobTimer } from "../mobtimer-api";
import { Broadcaster } from "./broadcaster";

type WebSocketOrAny = WebSocket | any;

export class RoomManager {
  /*
    todo:
    - Review broadcast functions
    - Decide whether this should be a module or class
    */

  private static _roomsByMobName: Map<string, Room> = new Map();
  private static _roomsBySocketId: Map<string, Room> = new Map();

  static get roomsBySocketIdMap() {
    for (const [key, value] of RoomManager._roomsBySocketId) {
      console.log("A Socket ID:", key, value.mobTimer?.state?.mobName);
    }
    return RoomManager._roomsBySocketId;
  }

  private static _getRoomByName(key: string): Room | undefined {
    console.log("getting room by mob name", key);
    return RoomManager._roomsByMobName.get(key);
  }
  private static _getRoomBySocketId(
    key: string | WebSocketOrAny
  ): Room | undefined {
    return RoomManager._roomsBySocketId.get(key);
  }

  static getMobTimer(mobName: string): MobTimer | undefined {
    return RoomManager._getRoomByName(mobName)?.mobTimer;
  }

  static getMobTimerFromSocket(socket: WebSocketOrAny) {
    const mobTimer = RoomManager._getRoomBySocketId(socket.id)?.mobTimer;
    return mobTimer;
  }

  static getSocketsForMob(mobName: string): Set<WebSocketOrAny> | undefined {
    return RoomManager._getRoomByName(mobName)?.sockets;
  }

  static getOrRegisterRoom(mobName: string, socket: WebSocketOrAny) {
    let room = RoomManager._getRoomByName(mobName);
    if (room) {
      RoomManager._joinRoom(room, socket);
    } else {
      room = RoomManager._createAndJoinRoom(mobName, socket);
    }

    return room.mobTimer;
  }

  private static _joinRoom(room: Room, socket: WebSocketOrAny) {
    console.log("adding socket to room", socket.id);
    room.sockets.add(socket);
    RoomManager._roomsBySocketId.set(socket.id, room);
  }

  private static _createAndJoinRoom(mobName: string, socket: WebSocketOrAny) {
    const mobTimer = new MobTimer(mobName);
    // todo: rename timerExpireFunc
    mobTimer.timerExpireFunc = () =>
      Broadcaster.broadcastExpireToMob(mobTimer as MobTimer);
    const room = { mobTimer, sockets: new Set<WebSocketOrAny>() };
    RoomManager._roomsByMobName.set(mobName, room);
    RoomManager._joinRoom(room, socket);
    return room;
  }

  static resetRooms() {
    RoomManager._roomsByMobName.clear();
    RoomManager._roomsBySocketId.clear();
  }
}
