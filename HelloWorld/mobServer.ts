import lib from "jest-websocket-mock";

export class MobServer {
  static createMobServer(wss: lib) {
    wss.on("connection", (socket) => {
      socket.on("message", message => {
          if (message === "close me") {
              socket.send("close you");
          }
      });
    });
  }
}
