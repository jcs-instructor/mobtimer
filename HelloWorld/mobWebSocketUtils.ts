import { HttpServer } from "http";
import * as http from "http";
import WebSocket, { Server } from "ws";
import { MobWebSocket } from "./mobWebSocket";
import { MobTimer } from "./mobTimer";

const _mobs: Map<string, MobTimer> = new Map();

function _getOrRegisterMob(mobName: string) {
    console.log('debug', _mobs);
    let mobTimer = _mobs.get(mobName);
    if (!mobTimer) {
        console.log("Registering debug")
        mobTimer = new MobTimer(mobName);
        _mobs.set(mobName, mobTimer);
    }
    return mobTimer;
}

function _processMessage(parsedMessage: any, socket: MobWebSocket, wss: Server) {
    let mobTimer: MobTimer;
    switch (parsedMessage.action) {
        case "join": {
            const mobName = parsedMessage.mobName;
            mobTimer = _getOrRegisterMob(mobName);
            socket.mobName = mobName;
            break;
        }
        case "update": {
            // todo: maybe: mobTimer.state = { ...mobTimer.state, ...parsedMessage.value };
            mobTimer.durationMinutes = parsedMessage.value.durationMinutes || mobTimer.durationMinutes;
            break;
        }
        case "pause": {
            mobTimer.pause();
            break;
        }
        case "start": {
            mobTimer.start();
            break;
        }
    }
    return mobTimer;
}

/**
 * Creates a WebSocket server from a Node http server. The server must
 * be started externally.
 * @param server The http server from which to create the WebSocket server
 */
export function createMobWebSocketServer(server: HttpServer): void {

    const wss = new WebSocket.Server({ server });

    wss.on("connection", function (webSocket: MobWebSocket) {
        webSocket.on("message", function (message) {
            let isString = typeof message == "string";
            let textMessage: string = (isString ? message : message.toString()) as string;
            let mobName: string; 
            const parsedMessage = JSON.parse(textMessage);
            mobName = JSON.parse(textMessage).mobName;
            let mobTimer = _processMessage(parsedMessage, webSocket, wss);
            let sendMessage = JSON.stringify(mobTimer.state);
            webSocket.send(sendMessage);
        });
    });
}


/**
 * Creates and starts a WebSocket server from a simple http server for testing purposes.
 * @param port Port for the server to listen on
 * @returns The created server
 */
export function startMobServer(port: number): Promise<HttpServer> {
    const server = http.createServer();
    createMobWebSocketServer(server);

    return new Promise((resolve) => {
        server.listen(port, () => resolve(server));
    });
}




