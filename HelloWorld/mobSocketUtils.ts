import { httpServer } from "http";
import * as http from "http";
import { Data } from "ws";
import WebSocket from "ws";
import { MobWebSocket, WebSocketInterface } from "./mobWebSocket";
import { MobTimer } from "./mobTimer";

export function joinMessage(mobName: string) {
    return JSON.stringify({ action: "join", mobName: mobName });
}
const _mobs: Map<string, MobTimer> = new Map();
export function updateMessage(durationMinutes: number) {
    return JSON.stringify({ action: "update", value: { durationMinutes: 32 } })
}/**
 * Creates and starts a WebSocket server from a simple http server for testing purposes.
 * @param port Port for the server to listen on
 * @returns The created server
 */
export function startServer(port: number): Promise<Server> {
    const server = http.createServer();
    createWebSocketServer(server);

    return new Promise((resolve) => {
        server.listen(port, () => resolve(server));
    });
}

/**
 * Forces a process to wait until the socket's `readyState` becomes the specified value.
 * @param socket The socket whose `readyState` is being watched
 * @param state The desired `readyState` for the socket
 */
export function waitForSocketState(socket: WebSocketInterface, state: number): Promise<void> {
    return new Promise(function (resolve) {
        setTimeout(function () {
            if (socket.readyState === state) {
                resolve();
            } else {
                waitForSocketState(socket, state).then(resolve);
            }
        });
    });
}

function getOrRegisterMob(mobName: string) {
    console.log('debug', _mobs);
    let mobTimer = _mobs.get(mobName);
    if (!mobTimer) {
        console.log("Registering debug")
        mobTimer = new MobTimer(mobName);
        _mobs.set(mobName, mobTimer);
    }
    return mobTimer;
}

/**
 * Creates a WebSocket server from a Node http server. The server must
 * be started externally.
 * @param server The http server from which to create the WebSocket server
 */
function createWebSocketServer(server: httpServer): void {

    const wss = new WebSocket.Server({ server });

    wss.on("connection", function (webSocket: MobWebSocket) {
        webSocket.on("message", function (message) {
            let isString = typeof message == "string";
            let textMessage: any = isString ? message : message.toString()
            let isJson = textMessage.includes("{")
            let mobTimer: MobTimer;
            let mobName
            if (isJson) {
                const parsedMessage = JSON.parse(textMessage);
                mobName = JSON.parse(textMessage).mobName;
                mobTimer = processMessage(parsedMessage, mobTimer, webSocket, wss);
            }
            let sendMessage = isJson ? JSON.stringify(mobTimer.state) : textMessage
            webSocket.send(sendMessage);
        });
    });
}

export function processMessage(parsedMessage: any, mobTimer: MobTimer, socket: MobWebSocket, wss: Server) {
    switch (parsedMessage.action) {
        case "join": {
            const mobName = parsedMessage.mobName;
            mobTimer = getOrRegisterMob(mobName);
            socket._mobName = mobName;
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
 * Creates a socket client that connects to the specified `port`. The client automatically
 * closes its socket after it receives the specified number of messages.
 * @param port The port to connect to on the localhost
 * @param closeAfter The number of messages to receive before closing the socket
 * @returns Tuple containing the created client and any messages it receives
 */
export async function createSocketClient(port: number, closeAfter?: number): Promise<[WebSocket, Data[]]> {
    const client = new WebSocket(`ws://localhost:${port}`);
    await waitForSocketState(client, client.OPEN);
    const messages: WebSocket.Data[] = [];

    client.on("message", (data) => {
        messages.push(data);

        if (messages.length === closeAfter) {
            client.close();
        }
    });

    return [client, messages];
}
