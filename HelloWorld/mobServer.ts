import lib from "jest-websocket-mock";
import { MobTimer } from "./mobTimer";

export class MobServer {
  static createMobServer(wss: any) {
    //const wss=new WebSocket.Server({server:bserver});
    const mobTimer = new MobTimer();
    wss.on("connection", (socket) => {
      socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.action === "update") {
          mobTimer.durationMinutes = 32;
        }
        broadcast(mobTimer.state);
        // socket.send(JSON.stringify(mobTimer.state));
      });
    });

    function broadcast(state) {
      wss.server.clients().forEach((client) => {
        client.send(JSON.stringify(state));
      });
    }
  }
}
