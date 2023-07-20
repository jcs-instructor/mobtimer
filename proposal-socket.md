Flow

# Client - Establish connection
mobClientServer.test.ts:

beforeAll

``` 
// 2 types of new mocks: 1. mock server, 2. mock socket
- const server = new MockMobSocketServer();
- const clientWrapperSocket1 = new MockWebSocketWrapper(server) as IWebSocketWrapper; =>
- const client1 = new MobSocketClient(wrapperSocket);
- const clientWrapperSocket2 = new MockWebSocketWrapper(server) as IWebSocketWrapper; =>
- const client2 = new MobSocketClient(wrapperSocket);
```

# Client - Send request
```
- client._sendJson() => 
- this.server.extractedOnReceiveFunc()
```

# Server - Receive request, send response
```
- this.server.extractedOnRequestReceivedFunc(socket, message) from previous => 
= if join mob, store or retrieve from socket arrays (using mock sockets) =>
= modify mobtimer =>
- RoomManager.broadcastToMob(mobTimer, parsedRequest.action) // or if echo or error, just send to requester; note: in addition to the below section, we also might do an assertion of the broadcasted message directly =>
- for each socket for this mob: socket.extractedOnResponseReceived({action, mobtimer.state}) 
```

# Client receives
- extractedOnResponseReceived({action, message}) =>
- do stuff based on the action
