import WS from 'jest-websocket-mock';
import { MobServer } from './mobServer';

const wssUrl = "wss://localhost:1234";

const closeMe = "close me";
const closeYou = "close you";

afterEach(() => {
    WS.clean();
});

test("When mob server is created, a socket can send and receive a close message", async () => {
    // Set up server
    const mockWSS = new WS(wssUrl);
    MobServer.createMobServer(mockWSS);

    // Set up socket
    const { socket, messagesReceivedBySocket } = await setupSocket(mockWSS);

    // Socket sends close-me message
    // todo in separate test: socket.send(JSON.stringify({ action: "join", mobName: "awesome-team" }));    
    socket.send(closeMe);
    await waitForSocketToClose(socket);
    expect(messagesReceivedBySocket).toEqual([closeYou]);
    // todo in separate test: const parsedMessage = JSON.parse(messagesReceivedBySocket[0]);
    //                        expect(parsedMessage).toEqual(new MobTimer().state);
    
    // Clean up server
    mockWSS.close(); // redundant with afterEach WS.clean()
});

async function setupSocket(mockWSS: WS) {
    const messages = [];
    const client = new WebSocket(wssUrl);
    await mockWSS.connected;
    client.onmessage = (e) => {
        if (e.data === closeYou) {
            client.close();
        }
        messages.push(e.data);
        console.log("debug pushed messages", messages);
    };
    return { socket: client, messagesReceivedBySocket: messages };
};

function waitForSocketToClose(socket) {
    return new Promise<void>(function (resolve) {
        setTimeout(function () {
            console.log('here');
            if (socket.readyState === socket.CLOSED) {
                resolve();
            } else {
                waitForSocketToClose(socket).then(resolve);
            }
        }, 5);
    });
};

