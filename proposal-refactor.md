// todo: use webSocketType
export function waitForSocketState(
socket: W3CWebSocket,
socket: { readyState: number },

// todo: add 10 ms to timeout function
export function waitForSocketState(

See mobtimer-frontend/package.json - we might not need:
"crypto": "^1.0.1",
"http": "^0.0.1-security",
"https": "^1.0.0",
"net": "^1.0.2",
"stream": "^0.0.2",
"tls": "^0.0.1",
"url": "^0.11.0",

// todo: think about names / whether to expose webSocket like this:
await waitForSocketState(socket.webSocket, socket.webSocket.OPEN);
