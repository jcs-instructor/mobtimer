import { MobTimer } from "./mobTimer";
import { Server, WebSocket } from 'ws'

export class MobServer {
  
  private static _mobs: Map<string, MobTimer> = new Map();

  static broadcast(wss, mobName, message) {
    wss.clients().forEach((socket) => {
      if (socket.mobName === mobName) {
        socket.send(message);
      }      
    });
  }

  static createMobServer(wss: Server) {
    //const wss=new WebSocket.Server({server:bserver});
    let mobTimer: MobTimer;
    wss.on("connection", (socket) => {
      socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message);
        mobTimer = MobServer.processMessage(parsedMessage, mobTimer, socket, wss);
      });
    });    
  }

  private static processMessage(parsedMessage: any, mobTimer: MobTimer, socket: WebSocket, wss: Server) {
    switch (parsedMessage.action){
       case "join": {
        const mobName = parsedMessage.mobName;
        mobTimer = MobServer.getOrRegisterMob(mobTimer, mobName);
        socket.mobName = mobName;
        break;
       }
       case "update": {
        // update mobTimer state variables
        mobTimer.durationMinutes = parsedMessage.value.durationMinutes || mobTimer.durationMinutes;
        break;
       }
       case "pause": {
        mobTimer.pause();
        break;
       }
      }

    MobServer.broadcast(wss, socket.mobName, JSON.stringify(mobTimer.state));
    return mobTimer;
  }

  private static getOrRegisterMob(mobTimer: MobTimer, mobName: string) {
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
