import { mobWebSocket, WebSocketInterface } from './xxmobWebSocket'

class mobTestSocket extends mobWebSocket implements WebSocketInterface {
    receivedMessages: string[] = []
}

export { mobTestSocket }
