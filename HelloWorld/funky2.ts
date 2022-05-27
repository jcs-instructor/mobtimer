export async function setup(WSS, wssUrl) {
    const messages = [];
    const client = new WebSocket(wssUrl);
    await WSS.connected;
    console.log('debug client', client.readyState);
    client.onmessage = (e) => {
        messages.push(e.data);
    };
    return { socket: client, messagesReceivedBySocket: messages };
};
