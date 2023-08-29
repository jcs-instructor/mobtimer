Changes to requestResponseIntegration.ts to use mock
- processRawRequest.test.ts 
  - uses mock for one test
  - removed "if socket.send" from sendToServer, frontendMobSocket.ts
  - later discussion: processRawRequest could be simplified and maybe is too simple
- sendToSocket.test.ts: tests Controller=>backendUtils=>sendToSocket (mocks)
  - moved `setSocketListener` to mobtimer-api
  - client = new FrontendMobSocket(new mockRoundTripSocket) which replaces sendToServer with `backendUtils.onStringRequest(message, this);`
  - associate client (frontendMobSocket) with webSocket so backend can access it: `client.webSocket.frontendMobSocket = client;` 
  - mock backendUtils to sendToSocket to call `backendSocket.frontendMobSocket?.frontendSocket?.onmessageReceived({data: message,});`

- desirable refactorings:
  - make controller non-static
  - if only updating data, use same action "update"
  - currently sending entire state, not clean?

- removed async from sendToServer
- refactor: extracted new proc onStringMessage

- If only updating data, change to action "update"
- move sendToSocket to Broadcast
- change to use lookup rather than add to websocket