Flow

# Client - Establish connection
App.tsx:

``` 
- const clientWrapperSocket = new W3CFrontendSocket(url) as IFrontendSocket; =>
- Controller.client = new FrontendMobSocket(clientWrapperSocket);

# Inject functions into controoler
App.tsx
- for each set<something> function, inject set<something> function.  This controls the <something> in the UI 
```

# Client - Send request
```
- Controller.client.<convenience func> =>
- Construct JSON to send to server =>
- Create request =>
- Controller.client._sendJson(request) => 
- this._clientSocket.sendMessage(request) => 
- _clientSocket.send()
```

# Server - Receive request, send response
```
- serverWebsocket.on => 
- extractedOnRequestReceivedFunc(serverWebSocket, request) => 
- if join mob, store or retrieve from serverWebSocket arrays =>
- modify mobtimer based on request =>
- RoomManager.broadcastToMob(mobTimer, parsedRequest.action) // or if echo or error, just send to requester => 
- for each socket for this mob: serverWebsocket.sendMessage( {action, mobtimer.state}) 
```

# Client receives
App.tsx:
- client.websocket.extractedonResponseReceived =>
- update frontend mobtimer using mobtimer state
- execute set<something> for each mobtimer state value changed
- do stuff based on the action
[Title](backlog.md)