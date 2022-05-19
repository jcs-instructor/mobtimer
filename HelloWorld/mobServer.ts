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
          mobTimer = MobServer.getOrRegisterMob(mobTimer, mobName);
          socket.mobName = mobName;
        } else if (parsedMessage.action === "update") {
          // update mobTimer state variables
          mobTimer.durationMinutes = parsedMessage.durationMinutes || mobTimer.durationMinutes;
        }

        // broadcast changed state to all sockets associated with mobname
        MobServer.broadcast(wss, socket.mobName, JSON.stringify(mobTimer.state));
      });
    });    
  }

  private static getOrRegisterMob(mobTimer: MobTimer, mobName: any) {
    mobTimer = MobServer._mobs.get(mobName);
    if (!mobTimer) {
      mobTimer = new MobTimer();
      MobServer._mobs.set(mobName, mobTimer);
    }
    return mobTimer;
  }

  static reset() {
    MobServer._mobs = new Map();
  }

}
