export class MobWebSocket {
    joinMob(mobName: string) {
        this._socket.send(JSON.stringify({ action: "join", mobName: mobName }));
    }
    private _socket: WebSocket;
    constructor(socket: WebSocket) {
        this._socket = socket;
    }
}
