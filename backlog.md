# Backlog

See also: [Reminders](./reminders.md)
See also: [Epics](./epics.md)

Improve Later

- [ ] Low priority. Ethan after hours:
  - [ ] 2nd crack on start scripts, think about class vs function
  - [ ] In tasks.json, reorder tasks by order of execution
- [ ] Ethan - between sessions:
  - [ ] Upgrade to new version of nodemon (current ver. 2.0.19, latest ver. 2.0.20)
- [ ] Delete old unused branches

Next

- [ ] Cleanup
  - [ ] Fix warnings
  - [ ] Remove unused elements from App.css, i.e., all starting with ".App"
  - [ ] Delete unused files:
    - [ ] home.html
    - [ ] app.yaml
- [ ] WIP: Deploy (as single repo) so can start using it ourselves when pair programming together :-)
      (NOTE: We currently have mobbers and a sound when time expires, so we can start using it!!!)
      (Consider Firebase or something else for free web hosting: https://www.programonaut.com/7-ways-to-host-your-web-application-for-free/#firebase)
  - [ ] WIP: Deploy backend and document in [CONTRIBUTING.md](./mobtimer-backend/CONTRIBUTING.md)
  - We currently have it https://mobtimer-backend-pj2v.onrender.com, and modified the environment variable, but haven't been able to test yet in Postman;
    and in the deployed UI, it is still trying to access the localhost backend even though we set the environment variable to go to
    [CONTRIBUTING](./mobtimer-backend/CONTRIBUTING.md)

## Completed (Done)

2023-22-03-23

- [x] NEXT: Get localhost:3000 to work !!!!!!! e.g., http://localhost:3000/mobtimer#/bb1 -> http://localhost:3000/mobtimer/#/bb1 ????
- [x] Make ws configurable
- [x] UI features (without styling) for all server-exposed methods - using React:

  - [x] Run UI from multiple browsers (or tabs) and verify both are changed/receiving messages
    - [x] Messages sent to all browsers in same mob
    - [x] Messages not sent to all browsers in different mobs

- [x] Make ports configurable (on frontend & backend)
- [x] Make WebSocketServer url configurable (frontend)
- [x] Create a timer
  - [x] UI - see Example React Source Code in resources.md)
  - [x] Hook up timer to websocket server
  - [x] UI - Start
  - [x] UI - Pause
  - [x] UI - Restart after Expired

2023-03-22

- [x] Create clean-all (reyarns all,...)

2023-02-01

- [x] Rotate participants on demand (button)
- [x] Make the UI timer tick-down less choppy, which often is especially obvious in the last second.
      (One-second delay in Timer.tsx can make browser clients off by 0.000 to 0.999 seconds from each other; interval is currently 1000 ms - maybe shorten - at least at first)

2023-01-31

- [x] Update document.title to show time remaining and Mob Timer (e.g., "01:28 - Mob Timer"). (Note: This shows up in the browser tab.)

2023-01-30

- [x] Play pneumatic horn sound when time expires, using wav file from: https://bigsoundbank.com/detail-1828-pneumatic-horn-simple-2.html
- [x] Add hardcoded roles to UI

2023-01-29

- [x] Add test for randomizing order of 3 participants (already had test for 2)

2023-01-28

- [x] Bug: After update duration minutes, UI timer sometimes keeps going into negative numbers even after time has expired.

2023-01-27

- [x] Refactor: Move mobTimer.tests.ts to mobtimer-api/test, and add config for debugging tests
- [x] Refactor: Fix word-wrapping in tests for ease of reading
- [x] Refactor: Change mockCurrentTime.ts to mobTestTimer and derive from mobTimer, allowing us to combine these 2 lines into one:
      From:
      const mobTimer = new MobTimer();
      const mockCurrentTime = createMockCurrentTime(mobTimer);
      To:
      const mockMobTimer = new MockMobTimer();

2023-01-26

- [x] Revisit tolerance seconds in \*.test.ts files (often 0.1) - but maybe not needed or could be much smaller, e.g., 0.01?
- [x] Revisit 0.1 in 3 places (2x in mobTimer.ts & once in mockCurrentTime.ts) - maybe can use booleans in some way (\_expired || !\_everStarted --> didn't work...)
- [x] Clarify nowInSecondsFunc with either comments or renaming in mockCurrentTime.ts
- [x] Add back test:
      In mobTimer.test.ts, add back the following test (immediately after the test "Get seconds remaining 1 second after start"):
      `     test("Get time remaining string 1 second after start", () => {
  const mobTimer = new MobTimer();
  const mockCurrentTime = createMockCurrentTime(mobTimer);
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  mockCurrentTime.delaySeconds(1);
  expect(mobTimer.secondsRemainingString).toEqual("05:59");
});`
- [x] mobClientServer.test.ts changes:
  - [x] Revert mobClientServer.test.ts to version in main branch (prior to expire-timer branch)
  - [x] Remove tests that were later marked skipped

2023-01-25

- [x] Fixed bugs:
  - [x] When paused and start 2nd browser tab, latter tab says "00:00" instead of actual time remaining
  - [x] In 2nd browser tab, Turn Duration (minutes) doesn't show the correct minutes when updated elsewhere.
        We need to add durationMinutes and setDurationMinutes state variables to the Room.tsx form parameters.
  - [x] If pause/start timer rapidly when 1 sec. or less remaining, expire messages pile up.

2023-01-18

- [x] Add duration minutes textbox in UI and sync across clients
  - [x] Add texbox, label, and update button
  - [x] Update mobtimer on front and back ends when durationMinutes changes in UI
  - [x] Merge branch DurationMinutesUI back to main
- [x] Modify ActionButton when time elapses (should say Start again)
  - [x] Also: Investigate possible bug: When running timer from UI and time expires, the client gets a lot of messages in rapid succession, and
        then if the timer is restarted, the time remaining is the amount from the last time the timer was paused instead of the full amount
        of time (from duration minutes)
- [x] Move onMessage from mobSocketClient to be independently added

2023-01-12

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
