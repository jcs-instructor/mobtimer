import WS from 'jest-websocket-mock';
import { MobServer } from './mobServer';
import { MobTimer } from './mobTimer';

const wssUrl = "wss://localhost:1234";

afterEach(() => {
    WS.clean();
    MobServer.reset();
});

test("Test can reset mob server", async () => {
    const mockWSS = new WS(wssUrl).server;
    MobServer.createMobServer(mockWSS);
    const { socket, messagesReceivedBySocket } = await setupSocket(mockWSS);

    socket.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket.send(JSON.stringify({ action: "update", value: {durationMinutes: 32 }}));    
    await waitForSocketToClose(socket);

    const parsedMessage = JSON.parse(messagesReceivedBySocket.slice(-1)[0]); 
    expect(parsedMessage.durationMinutes).toEqual(32);     
});


test("When mob server is created, when socket joins mob a new mob timer is returned", async () => {
    // Set up server
    const mockWSS = new WS(wssUrl).server;
    MobServer.createMobServer(mockWSS);

    // Set up socket
    const { socket, messagesReceivedBySocket } = await setupSocket(mockWSS);

    // Socket sends joins message
    socket.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    await waitForSocketToClose(socket);
    const parsedMessage = JSON.parse(messagesReceivedBySocket[0]);
    expect(parsedMessage).toEqual(new MobTimer().state);     
});

test("Socket updates a timer", async () => {
    const mockWSS = new WS(wssUrl).server;
    MobServer.createMobServer(mockWSS);
    const { socket, messagesReceivedBySocket } = await setupSocket(mockWSS);

    socket.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket.send(JSON.stringify({ action: "update", value: {durationMinutes: 32 }}));    
    await waitForSocketToClose(socket);

    const parsedMessage = JSON.parse(messagesReceivedBySocket.slice(-1)[0]); 
    expect(parsedMessage.durationMinutes).toEqual(32); 
});

test("Two sockets, first socket updates a timer", async () => {
    const mockWSS = new WS(wssUrl).server;
    MobServer.createMobServer(mockWSS); // mockWSS.server
    const { socket: socket1, messagesReceivedBySocket: messagesReceivedBySocket1 } = await setupSocket(mockWSS);
    const { socket: socket2, messagesReceivedBySocket: messagesReceivedBySocket2 } = await setupSocket(mockWSS);

    socket1.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket2.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket1.send(JSON.stringify({ action: "update", value: {durationMinutes: 32 }}));    
    await waitForSocketToClose(socket1);
    await waitForSocketToClose(socket2);

    const parsedMessage2 = JSON.parse(messagesReceivedBySocket2.slice(-1)[0]); 

    expect(parsedMessage2.durationMinutes).toEqual(32); 
});

test("Three sockets, two mobs: first socket updates a timer", async () => {
    const mockWSS = new WS(wssUrl).server;
    MobServer.createMobServer(mockWSS); // mockWSS.server
    const { socket: socket1, messagesReceivedBySocket: messagesReceivedBySocket1 } = await setupSocket(mockWSS);
    const { socket: socket2, messagesReceivedBySocket: messagesReceivedBySocket2 } = await setupSocket(mockWSS);
    const { socket: socket3, messagesReceivedBySocket: messagesReceivedBySocket3 } = await setupSocket(mockWSS);

    socket1.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket2.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket1.send(JSON.stringify({ action: "update", value: {durationMinutes: 32 }}));    
    socket3.send(JSON.stringify({ action: "join", mobName: "terrible-team" }));    
    await waitForSocketToClose(socket1);
    await waitForSocketToClose(socket2);

    const parsedMessage2 = JSON.parse(messagesReceivedBySocket2.slice(-1)[0]); 
    const parsedMessage3 = JSON.parse(messagesReceivedBySocket3.slice(-1)[0]); 

    expect(parsedMessage2.durationMinutes).toEqual(32); 
    expect(parsedMessage3.durationMinutes).toEqual(5);     
});

async function setupSocket(mockWSS: any) {
    const messages = [];
    const client = new WebSocket(wssUrl);
    await mockWSS.connected;
    client.onmessage = (e) => {
        messages.push(e.data);
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

