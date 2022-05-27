import WebSocket, { WebSocketServer } from 'ws';
import { MobServer } from './mobServer';
import { MobTimer, Status } from './mobTimer';
import { MobWebSocket } from './mobWebSocket';
import { MobWebSocket2, MobWebSocketTestInterface } from './mobWebSocket2';
const wssUrl = "wss://localhost:8097";
let ws;
beforeEach(async () => {
    if (ws) {
        await ws.close()
    }
    ws = new WebSocketServer({ port: 8097 })
})
afterEach(() => {
    MobServer.reset();
});

test.only("Test can reset mob server", async () => {
    console.log("Debug Creating");
    const mockWSS = new WebSocketServer({ port: 8093 })
    console.log("Debug created")
    MobServer.createMobServer(mockWSS);
    const socket = await MobWebSocket2.setupToLogMessages(mockWSS, wssUrl);
    await MobWebSocket2.waitToOpen(socket);

    socket.send(MobWebSocket2.joinMessage("awesome-team"));
    socket.send(MobWebSocket2.updateMessage(32));
    await MobWebSocket2.waitToClose(socket);

    const parsedMessage = JSON.parse(socket.messages.slice(-1)[0]);
    expect(parsedMessage.durationMinutes).toEqual(32);
});
