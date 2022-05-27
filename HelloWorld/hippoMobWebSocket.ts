import WebSocket from 'ws';
export class hippoMobWebSocket extends WebSocket {
    _mobName: string
    constructor(url) {
        super(url)
    }
}




