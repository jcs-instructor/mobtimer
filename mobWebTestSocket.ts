import { MobWebSocket, WebSocketInterface } from "./mobWebSocket";
import { waitForSocketState } from "./testUtils";
import { joinMessage, MobTimerRequest, MobTimerResponse } from "./mobWebMessages";
import { MobTimer } from "./mobTimer";

class MobWebTestSocket extends MobWebSocket implements WebSocketInterface {
  joinMob(mobName: string) {
    const message = joinMessage(mobName);
    this.send(message);
  }

  getLastJson(): MobTimerResponse {
    return JSON.parse(this.receivedMessages.at(-1) || "");
  }

  receivedMessages: string[] = [];

  constructor(url: string) {
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
