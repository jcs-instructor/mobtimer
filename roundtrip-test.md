- new files: fakeFrontendSocket.ts, sendToSocket.ts
- modified processRawRequest.test.ts to use mock
- removed "if socket" from sendToServer
- removed async from sendToServer
- refactor: extracted new proc onStringMessage

- If only updating data, change to action "update"
- move sendToSocket to Broadcast
- change to use lookup rather than add to websocket