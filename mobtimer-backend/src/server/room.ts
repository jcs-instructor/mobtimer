import { MobTimer } from "mobtimer-api";
import WebSocket from "ws";

export type Room = { mobTimer: MobTimer; sockets: Set<WebSocket> };
