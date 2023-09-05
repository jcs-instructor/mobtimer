```
- wrapperSocket = new W3CFrontendSocket(url) as IFrontendSocket;
- controller.client = new FrontendMobSocket(wrapperSocket);
    - constructor(webSocket: IFrontendSocket | undefined = undefined) {
      - this._webSocket = webSocket;
      - methods to send to server
- setSocketListener(controller, playAudio,getActionButtonLabel); - sets onMessageReceived for wrapperSocket **Could change parameter to socket and inline getActionButtonLabel**
  - onMessageReceived => 
    - playAudio
    - translateResponseData
    - set frontendMobtimer values
    - React "set" functions (set below)
- controller.injectSetActionButtonLabel(setActionButtonLabel);


User joins a mob

Client sends
- submitJoinMobRequest
  - controller.frontendMobTimer = new mobTimer(mobName);
  - controller.client?.joinMob(mobName);
    - client is frontendMobSocket
    - frontendMobSocket.joinMob =>
      - sendToSever (overridden in mock class)
      - webSocket.send
Server receives
- webSocket.on
  - BackendUtils.processRequest
    - BackendUtils._sendResponse
      - Broadcaster.sendToSocket OR
      - Brodcaster.sendToMob
        - Broadcaster.sendToSocket (mocked in test to look up associated mob timer)
           - socket.send



  - frontendMobSocket
    
```

- sendToSocket.test.ts: tests Controller=>backendUtils=>sendToSocket (mocks)
  - MockRoundTripSocket extends FrontendSocket: overrides sendServer: backendUtils.processRequest(message, this);`
  - frontendMobsocket = new FrontendMobSocket(new MockRoundtripSocket)


- processRawRequest.ts
  - basically testing MobRequestBuilder - don't need to track message in client, can look at it directly

- other ideas for tests
  - check Controller.client.<action> calls sendToServer with specific values
  - check BackendUtils.processRequest calls sendToSocket with specific values
  - check onmessageReceived makes changes to the frontend and calls set functions


- renamings:
  - consistent naming: heartbeatIntegration.test.ts or heartbeat.integration.test.ts
  - change "frontendMobSocket" to "(mob?)requestSender" (and FrontendMobSocket)
  - change "controller.client" to "controller.requestSender"
  - change "client =" to "requestSender =" 
  - change "socketClient" to "backendSocket" in Broadcaster
- other refactorings
  - extract code in frontendMobSocket. sendToServer to  FrontendBroadcast.sendToServer so easier to mock
  - if only updating data, change to action "update"
  - currently sending entire state, not clean?
