import { MobWebSocket, WebSocketInterface } from "./mobWebSocket";
import { waitForSocketState } from "./testUtils";
import { joinMessage } from "./mobWebMessages";

class MobWebTestSocket extends MobWebSocket implements WebSocketInterface {
  
  joinMob(mobName: string) {
    const testMessage = joinMessage(mobName);
    this.send(testMessage);
  }

  getLastJson(): any {
    return JSON.parse(this.receivedMessages.at(-1));
  }

  receivedMessages: string[] = [];

  constructor(url) {
    super(url);
    this.on("message", (data) => {
      this.receivedMessages.push(data.toString());
    });
  }

  async closeSocket() {
    this.close();
    await waitForSocketState(this, this.CLOSED);
  }
}

export { MobWebTestSocket as MobWebTestSocket };
