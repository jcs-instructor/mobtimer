import { MobWebSocket, WebSocketInterface } from "./mobWebSocket";

class MobWebTestSocket extends MobWebSocket implements WebSocketInterface {
  getLastJson(): any {
    // todo: refactor
    return JSON.parse(this.receivedMessages[this.receivedMessages.length - 1]);
  }

  receivedMessages: string[] = [];

  constructor(url) {
    super(url);
    this.on("message", (data) => {
      this.receivedMessages.push(data.toString());
    });
  }
}

export { MobWebTestSocket as MobWebTestSocket };
