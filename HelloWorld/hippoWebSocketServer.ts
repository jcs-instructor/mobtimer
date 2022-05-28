import WebSocket from "ws";
import { Server } from "http";
import { MobTimer } from "./mobTimer";
import { getOrRegisterMob, processMessage, } from "./hippoSocketTestUtils";

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
            let textMessage: any = isString ? message : message.toString()
            let isJson = textMessage.includes("{")
            let mobTimer: MobTimer;
            let mobName
            if (isJson) {
                const parsedMessage = JSON.parse(textMessage);
                mobName = JSON.parse(textMessage).mobName;
                switch (parsedMessage.action) {
                    case "join": {
                        const mobName = parsedMessage.mobName;
                        console.log("debug about to register");
                        mobTimer = getOrRegisterMob(mobName);
                        webSocket.mobName = mobName;
                        break;
                    }
                }
            }
            let sendMessage = isJson ? JSON.stringify(mobTimer.state) : textMessage
            webSocket.send(sendMessage);
        });
    });
}

export default createWebSocketServer;


