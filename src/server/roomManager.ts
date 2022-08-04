import { Room } from "./room";
import WebSocket from "ws";
import { MobTimer } from "../mobTimer";
import { Action } from "./action";

export class RoomManager {
  /*
    todo:
    - Review broadcast functions
    - Review this file and mobSocketServer.ts - how do they look? anything else to move? rename?
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

  static getSocketsForMob(mobName: string): Set<WebSocket> | undefined {
    return RoomManager._rooms.get(mobName)?.sockets;
  }

  static getOrRegisterRoom(
    // todo: remove unused param
    wss: WebSocket.Server,
    mobName: string,
    socket: WebSocket
  ) {
    let room = RoomManager._rooms.get(mobName);
    if (room) {
      RoomManager._joinRoom(room, socket);
    } else {
      room = RoomManager._createAndJoinRoom(mobName, socket);
    }

    return room.mobTimer;
  }

  private static _joinRoom(room: Room, socket: WebSocket) {    
    room.sockets.add(socket);
    RoomManager._mobTimers.set(socket, room.mobTimer);
  }

  private static _createAndJoinRoom(mobName: string, socket: WebSocket) {
    const mobTimer = new MobTimer(mobName);
    mobTimer.expireFunc = () =>
      RoomManager.broadcastToClients(mobTimer as MobTimer, Action.Expired);
    const room = { mobTimer, sockets: new Set<WebSocket>() };
    RoomManager._rooms.set(mobName, room);
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
    RoomManager._rooms.clear();
    RoomManager._mobTimers.clear();
  }
}
