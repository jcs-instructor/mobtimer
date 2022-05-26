import { WebSocket } from 'ws';

export class MobWebSocket2 {

    public static joinMessage(mobName: string) {
        return JSON.stringify({ action: "join", mobName: mobName });
    }

    public static updateMessage(durationMinutes: number) {
        return JSON.stringify({ action: "update", value: { durationMinutes: 32 } })
    }

    private _socket: WebSocket;
    constructor(socket: WebSocket) {
        this._socket = socket;
    }

    // todo: change to loop (not recursion)
    waitToClose() {
        const socket = this._socket;
        const thisInstance = this;
        return new Promise<void>(function (resolve) {
            setTimeout(function () {
                socket.close();
                if (socket.readyState === socket.CLOSED) {
                    resolve();
                } else {
                    thisInstance.waitToClose().then(resolve);
                }
            }, 5);
        });
    };
}
