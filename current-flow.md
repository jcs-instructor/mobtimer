Flow

# Client - Establish connection
App.tsx:

``` 
const clientWrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper; =>
Controller.client = new MobSocketClient(clientWrapperSocket);
```

# Client - Send request
```
Controller.client._sendJson() => 
this._clientSocket.sendMessage() => 
_clientSocket.send()
```

# Server - Receive request, send response
```
  serverWebsocket.on => 
  extractedOnRequestReceivedFunc(serverWebSocket, message) => 
  if join mob, store or retrieve from serverWebSocket arrays =>
  modify mobtimer =>
  RoomManager.broadcastToMob(mobTimer, parsedRequest.action) // or if echo or error, just send to requester => 
  for each socket for this mob: serverWebsocket.sendMessage( {action, mobtimer.state}) 
```

# Client receives
App.tsx:
client.websocket.extractedonResponseReceived =>
- update frontend mobtimer using mobtimer state
- do stuff based on the action
