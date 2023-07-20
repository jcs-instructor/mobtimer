Flow

App.tsx


# Client - Establish connection
App.tsx:

``` 
const clientWrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper; =>
Controller.client = new MobSocketClient(wrapperSocket);
```

# Client - Send request
```
Controller.client._sendJson => 
this._clientSocket.sendMessage => 
_clientSocket.send ( request: {action, message })
```

# Server - Receive request, send response
```
  serverWebsocket.on => 
  extractedOnRequestReceivedFunc(serverWebSocket, message) => 
  if join mob, add serverWebsocket and mob name to array =>
  modify mobtimer =>
  RoomManager.broadcastToMob(mobTimer, parsedRequest.action) => 
  serverWebsocket.sendMessage( {action, mobtimer.state}) 
```

# Client receives
client.websocket.extractedonResponseReceived =>
- update mobtimer using mobtimer state
- do stuff based on the action
