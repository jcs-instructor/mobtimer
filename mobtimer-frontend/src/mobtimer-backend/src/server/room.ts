import { MobTimer } from "src/mobTimer";
import WebSocket from "ws";

export type Room = { mobTimer: MobTimer; sockets: Set<WebSocket> };
