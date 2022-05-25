import { WebSocket } from 'ws';
export class MobWebSocket {
    
    joinMob(mobName: string) {
        this._socket.send(JSON.stringify({ action: "join", mobName: mobName }));
    }
    
    private _socket: WebSocket;
    constructor(socket: WebSocket) {
        this._socket = socket;
    }

    // todo: change to loop (not recursion)
    // todo: maybe rename to waitToClose
    waitForSocketToClose() {
        const socket = this._socket;
        const thisInstance = this;
        return new Promise<void>(function (resolve) {
            setTimeout(function () {
                socket.close();
                if (socket.readyState === socket.CLOSED) {
                    resolve();
                } else {
                    thisInstance.waitForSocketToClose().then(resolve);
                }
            }, 5);
        });
    };
}
