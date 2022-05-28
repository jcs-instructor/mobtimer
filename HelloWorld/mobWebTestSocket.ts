import { MobWebSocket, WebSocketInterface } from './mobWebSocket'

class MobTestSocket extends MobWebSocket implements WebSocketInterface {
    receivedMessages: string[] = []
}

export { MobTestSocket }
