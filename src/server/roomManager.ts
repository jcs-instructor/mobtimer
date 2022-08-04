import { Room } from "./room";
import WebSocket from "ws";
import { MobTimer } from "src/mobTimer";

export class RoomManager {
  constructor() {}

  static _mapOfMobNameToRoom: Map<string, Room> = new Map();
  static _mapOfSocketToMobName: Map<WebSocket, string> = new Map();

  static _getMobTimer(mobName: string): MobTimer | undefined {
    return RoomManager._mapOfMobNameToRoom.get(mobName)?.mobTimer;
  }
}
