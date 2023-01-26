# Backlog

See also: [Reminders](./reminders.md)

## Timer - Minimum Deployable Features

Refactor/Improve Later

- [ ] Low priority. Ethan after hours:
  - [ ] 2nd crack on start scripts, think about class vs function
  - [ ] In tasks.json, reorder tasks by order of execution
  - [ ] One-second delay in Timer.tsx can make browser clients off by 0.000 to 0.999 seconds from each other (interval is currently 1000 ms - maybe shorten - at least at first)
- [ ] Fixed mobtimer-api reference issue by deleting local files. Still an issue at times, so created a branch in case want to pursue later: branch = IncorrectReferenceShouldBreak (might be able to reproduce from this branch on Joel's PC, but maybe not). Issue was mobTimer.ts was referencing timeUtils via
      "mobtimer-api" instead of referencing the file directly

- [ ] Ethan - between sessions:
  - [ ] Upgrade to new version of nodemon (current ver. 2.0.19, latest ver. 2.0.20)
  - [ ] Log bug in mobti.me - web version not working (vs code version still works)
  - [ ] Automate index.ts
    - [ ] import and export exports.ts
    - [ ] get rid of most export statements from index.ts (exclude MobTimer something)
  - [ ] Check if we have an extra symlink watch
  - [ ] Investigate regeneration of d.ts files - can't reproduce

Next

- [ ] Bug on clean start: When start all tasks and join a mob for the first time, we get this error message in the browser console: "The connection to ws://localhost:4000/ was interrupted while the page was loading." And the play button says, "Start (temp hack)"

- [ ] Revisit 0.1 in 3 places (2x in mobTimer.ts & once in mockCurrentTime.ts) - maybe can use booleans in some way (\_expired || !\_everStarted --> didn't work...).
      And if keep, probably reduce 0.1 to 0.025 (per our discussion)
  - [ ] Do we need to add a padding/tolerance to the timer? Consider implications in mobTimer and in tests with tolerances/toBeCloseTo's
- [x] Add back test:
      In mobTimer.test.ts, add back the following test (immediately after the test "Get seconds remaining 1 second after start"):
      `        test("Get time remaining string 1 second after start", () => {
          const mobTimer = new MobTimer();
          const mockCurrentTime = createMockCurrentTime(mobTimer);
          mobTimer.durationMinutes = 6;
          mobTimer.start();
          mockCurrentTime.delaySeconds(1);
          expect(mobTimer.secondsRemainingString).toEqual("05:59");
        });
       `
- [ ] mobClientServer.test.ts changes:
  - [ ] Revert mobClientServer.test.ts to version in main branch (prior to expire-timer branch)
  - [ ] Remove tests that were later marked skipped
  - [ ] Modify the pause timer test, i.e., delete this line: await TimeUtils.delaySeconds(0.5);
  - [ ] In the test "Start timer with duration %p and elapse time sends message to all", remove:
    - [ ] remove: "+ Date.now()"
    - [ ] remove "+ 2" from await TimeUtils.delaySeconds(durationSeconds + toleranceSeconds + 2);
    - [ ] remove console log
    - [ ] Change expect to be equal to 0, instead of less than or equal to 0.1
          `           expect(
               client.lastSuccessfulResponse.mobState.secondsRemaining
             ).toBeLessThanOrEqual(0.1); // toEqual(0)
          `
- [ ] Merge into main branch

- [ ] UI features (without styling) for all server-exposed methods - using React:
  - [ ] Run UI from multiple browsers (or tabs) and verify both are changed/receiving messages
    - [x] Messages sent to all browsers in same mob
    - [ ] Messages not sent to all browsers in different mobs
- [ ] Rename folder mobtimer-api as mobtimer-shared (since it contains shared logic in addition to api)
- [ ] In UI listener, handle if response is not successful
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

- [ ] Change mockCurrentTime.ts to mockMobTimer and derive from mobTimer, allowing us to combine these 2 lines into one:
      From:
      const mobTimer = new MobTimer();
      const mockCurrentTime = createMockCurrentTime(mobTimer);
      To:
      const mockMobTimer = new MockMobTimer();

- [ ] Move as much logic out of App.tsx as possible (e.g., MVC / MVVM style decoupling)
- [ ] Maybe: \*\*Discuss [proposal-message-structure.md](./proposal-message-structure.md)
- [ ] Clean up mobtimer-frontend/package.json - we might not need:
      "crypto": "^1.0.1",
      "http": "^0.0.1-security",
      "https": "^1.0.0",
      "net": "^1.0.2",
      "stream": "^0.0.2",
      "tls": "^0.0.1",
      "url": "^0.11.0",
- [ ] Use webSocketType instead of W3CWebSocket (decoupling)
      export function waitForSocketState(
      socket: W3CWebSocket,
      socket: { readyState: number },
- [ ] Think about names / whether to expose webSocket like this:
      await waitForSocketState(socket.webSocket, socket.webSocket.OPEN);
- [ ] Look at where we have timeouts and intervals and change code blocks to function (otherwise ms arg can be in wrong place - hard to see)
- [ ] Create utility functions to create timeout and interval objects that create the object and call unref() on it before returning it

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

## Completed (Done)

2022-01-26

- [x] Clarify nowInSecondsFunc with either comments or renaming in mockCurrentTime.ts

2022-01-25

- [x] Fixed bugs:
  - [x] When paused and start 2nd browser tab, latter tab says "00:00" instead of actual time remaining
  - [x] In 2nd browser tab, Turn Duration (minutes) doesn't show the correct minutes when updated elsewhere.
        We need to add durationMinutes and setDurationMinutes state variables to the Room.tsx form parameters.
  - [x] If pause/start timer rapidly when 1 sec. or less remaining, expire messages pile up.

2022-01-18

- [x] Add duration minutes textbox in UI and sync across clients
  - [x] Add texbox, label, and update button
  - [x] Update mobtimer on front and back ends when durationMinutes changes in UI
  - [x] Merge branch DurationMinutesUI back to main
- [x] Modify ActionButton when time elapses (should say Start again)
  - [x] Also: Investigate possible bug: When running timer from UI and time expires, the client gets a lot of messages in rapid succession, and
        then if the timer is restarted, the time remaining is the amount from the last time the timer was paused instead of the full amount
        of time (from duration minutes)
- [x] Move onMessage from mobSocketClient to be independently added

2022-01-12

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
- [x] Display time remaining in UI - See [Display Time Remaining Proposal](./proposal-display-time.md)

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
