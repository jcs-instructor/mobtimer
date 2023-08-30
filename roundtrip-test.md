- processRawRequest.test.ts 
  - uses mock for one test
  - removed "if socket.send" from sendToServer, frontendMobSocket.ts
  - later discussion: processRawRequest could be simplified and maybe is too simple

- sendToSocket.test.ts: tests Controller=>backendUtils=>sendToSocket (mocks)
  - removed async from sendToServer
  - moved `setSocketListener` to mobtimer-api
  - `client = new FrontendMobSocket(`**new mockRoundTripSocket**`)` which replaces sendToServer with `backendUtils.onStringRequest(message, this);`
  - associate client (frontendMobSocket) with webSocket so backend can access it: `client.webSocket.frontendMobSocket = client;` 
  - mock backendUtils to sendToSocket to call `backendSocket.frontendMobSocket?.frontendSocket?.onmessageReceived({data: message,});`.  This puts backendSocket and mob name into dictionaries.

- processRawRequest.ts
  - basically testing MobRequestBuilder - don't need to track message in client, can look at it directly

- other ideas for tests
  - check Controller.client.<action> calls sendToServer with specific values
  - check backendUtils.processRequest calls sendToSocket with specific values
  - check onmessageReceived makes changes to the frontend and calls set functions


- desirable refactorings:
  - consistent naming: heartbeatIntegration.test.ts or heartbeat.integration.test.ts
  - change "frontendMobSocket" to "frontendMobAndSocket" (and FrontendMobSocket)
  - change "controller.client" to "controller.frontendMobAndSocket"
  - change "client =" to "frontendMobAndSocket =" 
  - change "socketClient" to "backendSocket"
  - if only updating data, change to action "update"
  - currently sending entire state, not clean?
- change to use lookup rather than add to websocket