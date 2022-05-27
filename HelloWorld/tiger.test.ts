import WebSocket, { WebSocketServer } from 'ws';
import { MobServer } from './mobServer';
import { MobTimer, Status } from './mobTimer';
import { MobWebSocket } from './mobWebSocket';
import { MobWebSocket2, MobWebSocketTestInterface } from './mobWebSocket2';
import { startServer } from './webSocketTestUtils';
const wssUrl = "wss://localhost:8097";
let ws;
let server;

beforeAll(async () => {
    server = await startServer(8093);
});

afterAll(() => server.close());


test.only("Test can reset mob server", async () => {

    MobServer.createMobServer(server);
    const socket = MobWebSocket2.setupToLogMessages(server, wssUrl);
    await MobWebSocket2.waitToOpen(socket);

    socket.send(MobWebSocket2.joinMessage("awesome-team"));
    socket.send(MobWebSocket2.updateMessage(32));
    await MobWebSocket2.waitToClose(socket);

    const parsedMessage = JSON.parse(socket.messages.slice(-1)[0]);
    expect(parsedMessage.durationMinutes).toEqual(32);
});
