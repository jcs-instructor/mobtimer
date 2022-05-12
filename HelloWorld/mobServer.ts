import lib from "jest-websocket-mock";
import { MobTimer } from "./mobTimer";

export class MobServer {
  static createMobServer(wss: lib) {
    wss.on("connection", (socket) => {
      socket.on("message", (message: string) => {
          const mobTimer = new MobTimer();
          const parsedMessage = JSON.parse(message);
          if (parsedMessage.action === "update") {
            mobTimer.durationMinutes = 32;
          }   
          socket.send(JSON.stringify(mobTimer.state));          
        });
    });
  }
}
