# Backlog

See also: [Reminders](./reminders.md)

## Timer - Minimum Deployable Features

Refactor/Improve Later

- [x] Delete testUtils.ts, migrating functions to appropriate files: mobSocketClient and mobSocketTestClient
- [ ] Low priority. Ethan after hours:

  - [ ] 2nd crack on start scripts, think about class vs function
  - [ ] In tasks.json, reorder tasks by order of execution

- [ ] Ethan - between sessions:
  - [ ] Automate index.ts
    - [ ] import and export exports.ts
    - [ ] get rid of most export statements from index.ts (exclude MobTimer something)
  - [ ] Check if we have an extra symlink watch
  - [ ] Investigate regeneration of d.ts files - can't reproduce

Next

- [ ] UI features (without styling) for all server-exposed methods - using React:
  - [x] Put action button on separate page that is shown after you join mob. See [React Router Proposal](./proposal-react-router.md)
  - [x] Be able to access a mob via the URL (instead of the text box)
  - [x] Fix bug(s) in accessing a mob via the URL (instead of the text box)
    - [x] See todo comments in Room.tsx
    - [x] Add useEffect to Room.tsx
    - [x] Guard for setMob function if mob is empty
    - [x] Add " as { mobName: string } " after useParams()
    - [x] Create variable mobNameLower - otherwise, doesn't work!
  - [x] Refactor: Remove mobName/setMobName/submitJoinRequest from JoinMobForm.tsx (no longer needed)
  - [x] Fix this: Every time the mob is joined from the UI, it joins twice. Also the Action button always triggers a join.
  - [ ] Modify ActionButton when time elapses (should say Start again)
  - [ ] Refactor: move as much logic out of App.tsx as possible (e.g., MVC / MVVM style decoupling)
  - [ ] Display time remaining
  - [ ] Update (min. remaining)
  - [ ] Run UI from multiple browsers (or tabs) and verify both are changed/receiving messages
    - [x] Messages sent to all browsers in same mob
    - [ ] Messages not sent to all browsers in different mobs
- [ ] Investigate possible bug: When running timer from UI and time expires, the client gets a lot of messages in rapid succession, and
      then if the timer is restarted, the time remaining is the amount from the last time the timer was paused instead of the full amount
      of time (from duration minutes)

- [ ] Make ports configurable (on frontend & backend)
- [ ] Make WebSocketServer url configurable (frontend)
- [ ] Create a timer
  - [ ] UI - see Example React Source Code in resources.md)
  - [ ] Hook up timer to websocket server
  - [ ] Mulitple repos - see [Multi-Repo Proposal](./proposal-multiple-repos.md)
  - [ ] Cancel
  - [ ] UI - Start
  - [ ] UI - Pause
  - [ ] UI - Restart
  - [ ] Deploy (as single repo)
- [ ] Handle illegal characters in mobName
- [ ] Trim mobName (and maybe url encode characters as needed)
- [ ] Handle trim(mobName) is empty
- [ ] Disable buttons as appropriate, e.g., if no legal mobName don't allow to click Join button

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
- [ ] Raise hand and chat
- [ ] Incorporate with vscode

## Other Features

- [ ] Roles, Randomize, Reorder
- [ ] Settings: Notifications

## Refactoring

- [ ] Convert timeUtils to function, look for others
- [ ] \*\*Discuss [proposal-message-structure.md](./proposal-message-structure.md)
- [ ] Do all todos in [proposal-refactor.md](./proposal-refactor.md)
- [ ] move onMessage from mobSocketClient to be independently added
- [ ] Look at where we have timeouts and intervals and change code blocks to function (otherwise ms arg can be in wrong place - hard to see)
- [ ] Create utilty functions to create timeout and interval objects that create the object and call unref() on it before returning it

## Other Technical

- [ ] Investigate Eclipse, Intellij, & Visual Studio
  - [ ] Review prior retros for generic lessons re. languages/environments/etc.
- [ ] Investigate improve gated checkin,else get rid of gated checkin requiring tests to pass

  - [ ] Consider gated checkin testing with push instead of commit

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

## Completed

2022-12-15

- [x] Refactor. Extend MobSocketTestClient from MobSocketClient, remove boolean for tracking, move onMessage and related code (lastResponse etc) from MobSocketClient to MobSocketTestClient

2022-12-15 (completed before this date)

- UI features in React:

  - [x] Start
  - [x] Read up on useState in React - e.g., why don't we need setLabel in ActionButton.tsx?
  - [x] Pause & Resume
  - [x] Review after hours changes, e.g., added mobTimer.toggle() functionality (in all layers)
  - [x] Hyperapp - try in CodePen (see bottom of our Google doc for what we did: https://docs.google.com/document/d/1gzzswKnbKsBagzEYMWYW2beelGWjuQzlxRzXQ8OcZhU/edit#)
  - [x] Continue with Hyperapp tutorial (implementing in mobtimer-frontend-hyperapp)
  - [x] Aborted: Implement Hyperapp front end basic features: - [x] Open socket (import mob client, etc.) - [x] Configure - [x] Remove hello.ts
  - [x] Remove Hyperapp
  - [x] WARNING: If keeping React Frontend, need to add back "frontend start" as a dependency in startAll !!!!
  - [x] Implement trackMessages boolean in mob socket client (so that the client can turn on/off storing messages from the server).
  - [x] Make scripts more stable (by using copy vs. link - and/or order of things; currently startAll works the 2nd time after a change to a ts file in mobtimer-api when using cp - might be same with link - Ethan to look into this)
  - [x] Display state: ready, running, paused
  - [x] UI features (without styling) for all server-exposed methods - using Hyperapp

- [x] Decide on HyperApp, ferp, mrbarry vs. React [Pros and Cons](./pros-and-cons.md)
- [x] Migrate Agenda and Reminders on Google Docs to md file
- [x] Discuss/fix Ethan's keyboard

- [x] Strong Types: ALSO ADD STRONG TYPES FOR ERROR RESPONSE AND ECHO RESPONSE (use sendJSON function, etc.) IN MOB SOCKET SERVER (SIMILAR TO WHAT WE DID IN OUR WAIT FOR ECHO RESPONSE FUNCTION - EVERYWHERE WITH JSON.PARSE USE EXPLICIT TYPE)

  - [x] ErrorResponse
  - [x] EchoResponse (Note: Joel finished this after time ran out at 5:30 on Thurs. 11/10/22)
  - [x] SuccessfulResponse (contains mobState and is used for mob)
  - [x] Review after-hours changes (EchoResponse & SuccessfulResponse) with Ethan if he wants to
  - [x] Joel: remove errorResponses from successfulResponses (or if it makes sense, something else)
  - [x] Review after-hours changes: Joel removed errorResponses from successfulResponses and created errorReceived boolean (similar to echoReceived boolean)

- [x] Join mob
- [x] Discuss HyperApp, ferp, mrbarry VS React

2022-11-10

- [x] Request/response ids aren't working - maybe a problem with function getUuid(): string { return uuidv4(); };

Refactoring

- [x] move testUtils.ts, mobClientSocket.ts back to mobtimer-api
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

Technical

- [x] Prevent mobtimer-api package from including src

Functional

- [x] UI - Create a form for starting a mob. Result: acknowledge button is pressed and value of field)
- [x] See [proposal for web socket client](./proposal-websocketclient.md)
      [x] Google zlib errors with react
      [x] Or use a different web socket library that works well with react
      [x] Test can connect to mob
