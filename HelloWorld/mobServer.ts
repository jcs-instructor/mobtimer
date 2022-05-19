// todo: import { Server } from ??? "jest-websocket-mock";
import { MobTimer } from "./mobTimer";

export class MobServer {
  
  private static _mobs: Map<string, MobTimer> = new Map();

  static broadcast(wss, mobName, message) {
    wss.clients().forEach((socket) => {
      if (socket.mobName === mobName) {
        socket.send(message);
      }      
    });
  }

  static createMobServer(wss: any) {
    //const wss=new WebSocket.Server({server:bserver});
    let mobTimer: MobTimer;
    wss.on("connection", (socket) => {
      socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.action === "join") {
          const mobName = parsedMessage.mobName;
          // register mob - get the existing mob or add it
          mobTimer = MobServer._mobs.get(mobName);
          if (!mobTimer) {
            mobTimer = new MobTimer();
            MobServer._mobs.set(mobName, mobTimer);
          }
          // associate this socket with mobname
          socket.mobName = mobName;
        }

        // update mobTimer state variables
        if (parsedMessage.action === "update") {
          mobTimer.durationMinutes = parsedMessage.durationMinutes || mobTimer.durationMinutes;
        }

        // broadcast changed state to all sockets associated with mobname
        MobServer.broadcast(wss, socket.mobName, JSON.stringify(mobTimer.state));
      });
    });    
  }

  static reset() {
    MobServer._mobs = new Map();
  }

}
