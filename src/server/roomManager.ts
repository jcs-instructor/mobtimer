import { Room } from './room';
import WebSocket from "ws";

export class RoomManager {

    constructor() {                
    }

    static _mapOfMobNameToRoom: Map<string, Room> = new Map();
    static _mapOfSocketToMobName: Map<WebSocket, string> = new Map();
}
