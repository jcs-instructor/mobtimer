import WebSocket from "ws";
import { Server } from "http";
import { MobTimer } from "./mobTimer";

/**
 * Creates a WebSocket server from a Node http server. The server must
 * be started externally.
 * @param server The http server from which to create the WebSocket server
 */
function createWebSocketServer(server: Server): void {

    const wss = new WebSocket.Server({ server });

    wss.on("connection", function (webSocket) {
        webSocket.on("message", function (message) {
            let isString = typeof message == "string";
            let textMessage: string = isString ? message : message.toString()
            let isJson = textMessage.includes("{")
            let mobName
            if (isJson) {
                mobName = JSON.parse(textMessage).mobName
            }
            let sendMessage = isJson ? JSON.stringify(new MobTimer(mobName).state) : textMessage
            webSocket.send(sendMessage);
        });
    });
}

export default createWebSocketServer;