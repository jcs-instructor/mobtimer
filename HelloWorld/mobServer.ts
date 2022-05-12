import lib from "jest-websocket-mock";
import { MobTimer } from "./mobTimer";

export class MobServer {
  static createMobServer(wss: lib) {
    wss.on("connection", (socket) => {
      socket.on("message", message => {
          socket.send(JSON.stringify(new MobTimer().status));          
        });
    });
  }
}
