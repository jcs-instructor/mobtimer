// todo: import { Server } from ??? "jest-websocket-mock";
import { MobTimer } from "./mobTimer";

export class MobServer {
  
  static _mobs: Map<string, MobTimer> = new Map();

  static broadcast(wss, mobName, message) {
    wss.clients().forEach((client) => {
      if (client.mobName === mobName) {
        client.send(message);
      }      
    });
  }

  static createMobServer(wss: any) {
    //const wss=new WebSocket.Server({server:bserver});
    let mobTimer = new MobTimer();
    wss.on("connection", (socket) => {
      socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.action === "join") {
          mobTimer = MobServer._mobs.get(parsedMessage.mobName);
          if (!mobTimer) {
            mobTimer = new MobTimer();
            MobServer._mobs.set(parsedMessage.mobName, mobTimer);
          }
          socket.mobName = parsedMessage.mobName;
        }
        if (parsedMessage.action === "update") {
          mobTimer.durationMinutes = 32;
        }
        MobServer.broadcast(wss, socket.mobName, JSON.stringify(mobTimer.state));
      });
    });
    
  }
}
