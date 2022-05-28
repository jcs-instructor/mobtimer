import { MobWebSocket, WebSocketInterface } from './mobWebSocket'

class MobWebTestSocket extends MobWebSocket implements WebSocketInterface {
    receivedMessages: string[] = []
}

export { MobWebTestSocket as MobTestSocket }
