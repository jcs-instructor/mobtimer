
import { Server } from 'ws';

export interface MobWebSocketTestInterface extends WebSocket {
    mobName?: string;
    messages?: string[];
}

export interface MobWebSocketInterface extends WebSocket {
    mobName?: string;
}
export class MobWebSocket2 {

    public static async setupToLogMessages(mockWSS: Server, wssUrl: string) {
        const client: MobWebSocketTestInterface = new WebSocket(wssUrl);
        client.messages = [];
        await mockWSS.connected;
        client.onmessage = (e) => {
            client.messages.push(e.data);
        };
        return client;
    };

    public static joinMessage(mobName: string) {
        return JSON.stringify({ action: "join", mobName: mobName });
    }

    public static updateMessage(durationMinutes: number) {
        return JSON.stringify({ action: "update", value: { durationMinutes: 32 } })
    }


    // todo: change to loop (not recursion)
    public static waitToClose(socket: WebSocket) {
        return new Promise<void>(function (resolve) {
            setTimeout(function () {
                socket.close();
                if (socket.readyState === socket.CLOSED) {
                    resolve();
                } else {
                    MobWebSocket2.waitToClose(socket).then(resolve);
                }
            }, 5);
        });
    };
}
