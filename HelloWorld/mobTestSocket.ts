import { MobWebSocket, WebSocketInterface } from './mobWebSocket'

class mobTestSocket extends MobWebSocket implements WebSocketInterface {
    receivedMessages: string[] = []
}

export { mobTestSocket }
