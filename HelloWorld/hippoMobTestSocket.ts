import { hippoMobWebSocket, WebSocketInterface } from './hippoMobWebSocket'

class hippoMobTestSocket extends hippoMobWebSocket implements WebSocketInterface {
    receivedMessages: string[]
}

export { hippoMobTestSocket }
