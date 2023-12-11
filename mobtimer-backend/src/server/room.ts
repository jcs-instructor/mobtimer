import { MobTimer } from "../mobtimer-api";
import { WebSocketWithId } from "./webSocketWithId";

export type Room = { mobTimer: MobTimer; sockets: Set<WebSocketWithId> };
