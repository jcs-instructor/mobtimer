# Backlog

- [] Note: See also [Reminders](./reminders.md)

## Timer - Minimum Deployable Features

- [x] demo runAll task
- [x] Request/response ids aren't working - maybe a problem with function getUuid(): string { return uuidv4(); };
      Someday
  - [ ] Migrate Agenda and Reminders on Google Docs to md file
  - [ ] Discuss Ethan's keyboard
        Next
- [ ] Refactoring:

  - [x] mobclientserver.test.ts: use 'echo' action - see [proposal-echo.md](./proposal-echo.md)
    - [x] Combine two echo lines from test into one
    - [x] Remove id from tests
    - [x] Remove id from model
    - [x] Fix two tests marked as skip
  - [x] merge back onto main branch (from move-files-to-api)
  - [x] Get rid of functions for each request that have json.stringify, and make a helper function that does json.stringify + socket.send together
  - [x] Consider more ways to reduce number of places have to make a change when add a new request/response type. Consider proxy generation.
        (We currently have a lot of code to insure strong typing, but proxy generation could remove one or two steps, possibly.) If making
        a change, try adding a new feature, e.g., Add Cancel (timer) function - [x] In index.ts - [x] In mobTimerRequests - [x] Other (if applicable, e.g., mobSocketClient)
  // resume here - and AFTER THIS ITEM, consider waiting on further refactoring !!!!!!!!!!!!!!
  - [ ] WIP: Strong Types: ALSO ADD STRONG TYPES FOR ERROR RESPONSE AND ECHO RESPONSE (use sendJSON function, etc.) IN MOB SOCKET SERVER (SIMILAR TO WHAT WE DID IN OUR WAIT FOR ECHO RESPONSE FUNCTION - EVERYWHERE WITH JSON.PARSE USE EXPLICIT TYPE)
      - [x] ErrorResponse
      - [x] EchoResponse (Note: Joel finished this after time ran out at 5:30 on Thurs. 11/10/22)
      - [x] SuccessfulResponse (contains mobState and is used for mob)
      - [ ] Any others (see MobTimerResponses types)
  - [ ] Something functional... ____ (not refactoring if at all reasonable)
  - [ ] Investigate improve gated checkin,else get rid of gated checkin requiring tests to pass
    - [ ] Consider gated checkin testing with push instead of commit
  - [ ] Do all todos in [proposal-refactor.md](./proposal-refactor.md)
  - [x] move testUtils.ts, mobClientSocket.ts back to mobtimer-api
  - [ ] move onMessage from mobSocketClient to be independently added
  - [ ] Look at where we have timeouts and intervals and change code blocks to function (otherwise ms arg can be in wrong place - hard to see)
  - [ ] Create utilty functions to create timeout and interval objects that create the object and call unref() on it before returning it

- [ ] Investigate Eclipse, Intellij, & Visual Studio

  - [ ] Review prior retros for generic lessons re. languages/environments/etc.

- [ ] **Start mob**

  - [x] UI - Create a form for starting a mob. Result: acknowledge button is pressed and value of field)
  - [ ] See [proposal for web socket client](./proposal-websocketclient.md)
        [x] Google zlib errors with react
        [x] Or use a different web socket library that works well with react
        [x] Test can connect to mob
  - [ ] refactor: use testUtils and mobSocketClient from mobtimer-api
  - [ ] when user joins a mob from the UI, show message "connected"

- [ ] **Discuss HyperApp, ferp, mrbarry VS React**

  - [ ] [Pros and Cons](./pros-and-cons.md)
  - [ ] HyperApp, ferp tutorials?
  - [ ] Reduce mrbarry code??? Reuse mrbarry code

- [ ] Windows Shell Files: Fix this: start shell files don't work in Windows (temporary workaround: manually open ./start-backend.sh and ./start-frontend)
      (CONSIDER MOVING THIS TO TECHNICAL IF NOT IMMEDIATE PRIORITY)
- [ ] Make default port different for frontend & backend
- [ ] Make ports configurable (on frontend & backend)
- [ ] Make WebSocketServer url configurable (frontend)
- [ ] Create a timer
  - [ ] \*\*Discuss [proposal-message-structure.md](./proposal-message-structure.md)
  - [ ] UI - see Example React Source Code in resources.md)
  - [ ] Hook up timer to websocket server
  - [ ] Mulitple repos - see [Multi-Repo Proposal](./proposal-multiple-repos.md)
  - [ ] Cancel
  - [ ] UI - Start
  - [ ] UI - Pause
  - [ ] UI - Restart

## Split Repos and Deploy

- [ ] Split repos before deploy (see [background-and-decisions](./background-and-decisions.md))
- [ ] Deploy

## Timer - Minimum Features for Ethan & Joel to Use Instead of MobTi.me

- [ ] Mobbers, Rotate
- [ ] Settings: Sound

# High Value Features

- [ ] Have separate alarm / timer for breaks and retro
- [ ] Rearrangeable lists
  - [ ] Reminders (similar to goals)
- [ ] Lists
  - [ ] Chat messages
- [ ] Make tabs into sizeable windows
- [ ] Raise hand
- [ ] Incorporate with vscode

## Other Features

- [ ] Roles, Randomize, Reorder
- [ ] Settings: Notifications

## Other Technical

- [ ] Prevent mobtimer-api package from including src
- [ ] Get UI tests working in App.test.tsx (look for .skip, etc.) - maybe see https://reactjs.org/docs/testing-recipes.html
- [ ] Look into TypeScript Modules .d.ts: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
- [ ] Write script to automatically start frontend and backend (currently documented in CONTRIBUTING.
- [ ] Set tsc options: target es2015 or later
- [ ] Backend
  - [ ] Handle Bad Json Gracefully on Client (JSON.parse …)
  - [ ] detectOpenHandles: Maybe try using --detectOpenHandles with Jest
  - [ ] Maybe add timestamp to MobTimerResponse.actionInfo
- [ ] Persistence -
  - [ ] Timeout: Should mobs be deleted on timeout (after period of inactivity)?
  - [ ] Persist Mobs in case server is reset, etc. (e.g., in DB or other physical storage)
- [ ] Maybe: Try decorators - https://www.typescriptlang.org/docs/handbook/decorators.html
- [ ] Backend - Think about what to do if pause/resume/start methods are called when shouldn’t be (throw?)
- [ ] JavaScript template literals (refactoring): Consider using Javascript template literals instead of string concatenation, e.g., `${minutesPart}:${secondsPart}`;
- [ ] Figure out way to reduce spurious failing tests (in Jest)
- [ ] Handle console.log that complete after test completed?
