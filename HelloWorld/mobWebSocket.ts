import WebSocket from 'ws';
export interface WebSocketInterface extends WebSocket {

};
class MobWebSocket extends WebSocket implements WebSocketInterface {
    _mobName: string
    constructor(url) {
        super(url)
    }

}

export { MobWebSocket }




