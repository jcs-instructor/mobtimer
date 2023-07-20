Flow

App.tsx


# Client - Establish connection
beforeAll

``` 
- const server = new MockMobSocketServer();
- const clientWrapperSocket = new MockWebSocketWrapper(server) as IWebSocketWrapper; =>
- Controller.client = new MobSocketClient(wrapperSocket);
```

# Client - Send request
```
- Controller.client._sendJson({action,message}) => 
- mockRequest = { { action, message },  clientSocket (Controller.client) }
- this.server.extractedOnReceiveFunc(mockRequest))
```

# Server - Receive request, send response
```
- this.server.extractedOnRequestReceivedFunc(mockRequest)) from previous => 
= if join mob, add "this" (clientSocket) and mob name to array ( only necessary if testing how client handles response) =>
= modify mobtimer =>
- RoomManager.broadcastToMob( { mobTimer.state, parsedRequest.action }) => 

  could do an assertsion here that we get the right mobTimer and parsedRequest.action and skip the rest OR

- for each clientWebSocket  in the array, clientWebsocket.messageReceived( {action, mobtimer.state}) 
```

# Client receives
- extractedOnResponseReceived( {action, message}) =>
- update mobtimer using mobtimer state
- do stuff based on the action
