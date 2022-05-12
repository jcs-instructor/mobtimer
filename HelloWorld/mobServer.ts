// todo: import { Server } from ??? "jest-websocket-mock";
import { MobTimer } from "./mobTimer";

export class MobServer {

  static broadcast(wss, message) {
    wss.clients().forEach((client) => {
      client.send(message);
    });
  }

  static createMobServer(wss: any) {
    //const wss=new WebSocket.Server({server:bserver});
    const mobTimer = new MobTimer();
    wss.on("connection", (socket) => {
      socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.action === "update") {
          mobTimer.durationMinutes = 32;
        }
        MobServer.broadcast(wss, JSON.stringify(mobTimer.state));
      });
    });
    
  }
}
