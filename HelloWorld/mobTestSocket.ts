import { mobWebSocket, WebSocketInterface } from './mobWebSocket'

class mobTestSocket extends mobWebSocket implements WebSocketInterface {
    receivedMessages: string[] = []
}

export { mobTestSocket }
