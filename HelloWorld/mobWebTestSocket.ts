import { MobWebSocket, WebSocketInterface } from './mobWebSocket'

class MobWebTestSocket extends MobWebSocket implements WebSocketInterface {

    receivedMessages: string[] = []

    constructor(url) {
        super(url)
        this.on("message", (data) => {
            this.receivedMessages.push(data.toString());
        });
    }
}

export { MobWebTestSocket as MobWebTestSocket }
