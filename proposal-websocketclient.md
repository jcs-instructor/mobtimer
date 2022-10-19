"Obsoletish":

- [ ] Tests are failing: - 1 hr. - try to debug why; probably do this on 'revise' branch and double-check no references to w3cwebsocket - Consider order of doing things, e.g., not having api as a separate module
- [ ] Consider using a proxy to the websocket (maybe see: https://stackoverflow.com/questions/23686379/how-to-make-websockets-to-go-through-a-proxy-in-node-js)

- [ ] Switch back to using ws
      [ ] Refactor mobtimer-client to use a created interface and pass in client when calling
      [ ] Change frontend code to use ws
      [ ] If that works, copy code to backend
- [ ] Revert & Refator: Do this first: revert back to using "ws" library and refactoring: Decrease profile of 3rd party web socket class (keep references entirely within one file if possible; maybe use interfaces, etc.; both on client and server)

- open()
- close()
- readystate
- onmessage
- onopen
- send
- ...

[ ] Approach 1: Get example code working (from https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/) in a separate project

- [ ] Get example code working in separate project
- [ ] Try our logic in the example project
- [ ] Update our code

[ ] Approach 2: Investigate w3cwebsocket.send method

[ ] Approach 3: Change backend to use w3cwebsocket

[ ] Approach 4: Create a plain socket instead of an extended socket (composition instead of inheritance)
