Mobtimer Project Flow

# App.tsx

## Start aplication
- wrapperSocket = new W3CFrontendSocket(url) as IFrontendSocket;
- controller.client = new Client(wrapperSocket);
    - constructor(webSocket: IFrontendSocket | undefined = undefined) 
      - this._webSocket = webSocket;
      - methods to send to server
- setSocketListener(controller, playAudio,getActionButtonLabel); - sets onMessageReceived for wrapperSocket **Could change parameter to socket and inline getActionButtonLabel**
  - sets onMessageReceived => see Client receives below 
- controller.injectSetActionButtonLabel(setActionButtonLabel);

## User joins a mob

### Client sends
- submitJoinMobRequest
  - controller.frontendMobTimer = new mobTimer(mobName);
  - controller.client?.joinMob(mobName);
    - sendToSever (overridden in mock class)
    - webSocket.send

### Server receives and sends
- webSocket.on
  - BackendUtils.processRequest
    - BackendUtils._sendResponse
      - Broadcaster.sendToSocket OR
      - Brodcaster.sendToMob
        - Broadcaster.sendToSocket (mocked in test to look up associated mob timer)
           - socket.send

### Client receives
- webSocket.on
  - onMessageReceived
    - playAudio
    - translateResponseData
    - set frontendMobtimer values
    - React "set" functions (set below)  

# Tests 

## requestResponse.mockSocket.integration.test.ts
- Tests Controller=>backendUtils=>sendToSocket (mocks)
  - MockRoundTripSocket extends FrontendSocket: overrides sendServer: backendUtils.processRequest(message, this);`
  - frontendMobsocket = new Client(new MockRoundtripSocket)

## backendutils-getresponse.ts
  - basically testing MobRequestBuilder (getResponse simply converts to ) - don't need to track message in client, can look at it directly

- other ideas for tests
  - check Controller.client.<action> calls sendToServer with specific values
  - check BackendUtils.processRequest calls sendToSocket with specific values
  - check onmessageReceived makes changes to the frontend and calls set functions

# Refactorings

- renamings:
  - change "webSocket" in backend code to "backendSocket"

- other refactorings
  - extract code in client. sendToServer to  FrontendBroadcast.sendToServer so easier to mock
  - if only updating data, change to action "update"
  - currently sending entire state, not clean?
  - move BackendUtils._sendResponse into Broadcaster

