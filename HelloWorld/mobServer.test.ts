import WS from 'jest-websocket-mock';
import { MobServer } from './mobServer';
import { MobTimer } from './mobTimer';

const wssUrl = "wss://localhost:1234";

afterEach(() => {
    WS.clean();
});

test("When mob server is created, when socket joins mob a new mob timer is returned", async () => {
    // Set up server
    const mockWSS = new WS(wssUrl);
    MobServer.createMobServer(mockWSS);

    // Set up socket
    const { socket, messagesReceivedBySocket } = await setupSocket(mockWSS);

    // Socket sends joins message
    socket.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    await waitForSocketToClose(socket);
    const parsedMessage = JSON.parse(messagesReceivedBySocket[0]);
    expect(parsedMessage).toEqual(new MobTimer().state); 
    
    // Clean up server
    mockWSS.close(); // redundant with afterEach WS.clean()
});

test("Socket updates a timer", async () => {
    const mockWSS = new WS(wssUrl);
    MobServer.createMobServer(mockWSS);
    const { socket, messagesReceivedBySocket } = await setupSocket(mockWSS);

    socket.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket.send(JSON.stringify({ action: "update", value: { durationMinutes: 32} }));    
    await waitForSocketToClose(socket);

    const parsedMessage = JSON.parse(messagesReceivedBySocket.slice(-1)[0]); 
    expect(parsedMessage.durationMinutes).toEqual(32); 
    
    // Clean up server
    mockWSS.close(); // redundant with afterEach WS.clean()
});

async function setupSocket(mockWSS: WS) {
    const messages = [];
    const client = new WebSocket(wssUrl);
    await mockWSS.connected;
    client.onmessage = (e) => {
        messages.push(e.data);
        console.log("debug pushed messages", messages);
    };
    return { socket: client, messagesReceivedBySocket: messages };
};

function waitForSocketToClose(socket) {
    return new Promise<void>(function (resolve) {
        setTimeout(function () {
            socket.close();
            if (socket.readyState === socket.CLOSED) {
                resolve();
            } else {
                waitForSocketToClose(socket).then(resolve);
            }
        }, 5);
    });
};

