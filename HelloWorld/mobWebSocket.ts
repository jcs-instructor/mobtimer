import { WebSocket } from 'ws';
export class MobWebSocket {
    
    joinMob(mobName: string) {
        this._socket.send(JSON.stringify({ action: "join", mobName: mobName }));
        console.log("joining", this._socket);
    }
    
    private _socket: WebSocket;
    constructor(socket: WebSocket) {
        this._socket = socket;
        console.log("Constructing", socket, this._socket)
    }

    // todo: change to loop (not recursion)
    // todo: maybe rename to waitToClose
    waitForSocketToClose(socket: any) {
        console.log("Waiting", socket);
        const thisInstance = this;
        return new Promise<void>(function (resolve) {
            console.log("This1", thisInstance);
            setTimeout(function () {
                console.log("DEBUG", socket);
                socket.close();
                if (socket.readyState === socket.CLOSED) {
                    resolve();
                } else {
                    console.log("This2", thisInstance);
                    thisInstance.waitForSocketToClose(socket).then(resolve);
                }
            }, 5);
        });
    };
}
