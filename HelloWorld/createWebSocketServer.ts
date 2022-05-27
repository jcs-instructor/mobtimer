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
            let returnMessage = message;
            console.log("message", message);
            if (!(typeof message == "string" || message instanceof String)) {
                console.log("converting to string");
                returnMessage = message.toString()
                console.log("converted", returnMessage);
            }
            webSocket.send(returnMessage);
        });
    });
}

export default createWebSocketServer;