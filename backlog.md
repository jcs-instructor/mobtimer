# Other resources

See also: [Reminders](./reminders.md), [Completed](./completed.md), [Agenda](./agenda.md) and
VSCode extension is in a separate repo here: https://github.com/jcs-instructor/mobtimer-vscode/blob/main/backlog-vscode.md

Remember to review Improve Later and To be prioritized

# Between sessions

Ethan:
- [ ] **Reset npmjs password**
- [x] **Generate exports watch** doesn't seem to be refreshing on change
- [x] **Session startup process** Change code so you don't have to run "code ." at startup, i.e. have second variable for REACT_APP...
- [ ] **Listener performance**: Only execute setSocketListener if listener has not yet been defined
- [ ] **Automate vscode ext. install steps** (see steps in CONTRIBUTING.md) (MAYBE ETHAN TO DO BETWEEN SESSIONS)
- [ ] **Document when to use console.info vs console.log** in CONTRIBUTING.md

Joel:
- [ ] Refactor processRawRequest (decouple from socket and only return what's needed, i.e., mobName,...)
- [ ] Refactor: booleans connecting, connected --> enum connectionStatus notStarted, connecting, connected
----

# To be prioritized / refined
- ...

-----------------------------------------------------------------------------------------------------------------------

# Next (CURRENT TOP GOALS: 1. DOGFOOD, 2. PREP FOR CUSTOMERS TO USE)

- [x] **Deploy to onrender so can dogfood**
- [ ] **Fix failing Heartbeat integration test**
- [ ] **Speed up tests** WIP
      - [x] Refactor processRawRequest to just return the response and mobName (don't need others)
      - [ ] In non-integration request repsonse tests use jest mock time
      - [ ] Reduce integration tests: instead do most of that test logic in the tests that calls processRawRequest directly            
      - [ ] Fix inconsistent names (class / file): 
            - MobSocketClient class in frontendSocket.ts
            - MobSocketTestClient class in mobSocketTestClient.ts
            - TestClient class in TestClient.ts
      - [ ] Move TestClient into mobtimer-api
      (initial intent: keep in integration: alternative websocket & all 2 mob tests)
- [ ] **Refactor Socket Files** - Move unrelated functions out of backendSocket and consider making classes with static functions
- [ ] **Rename client.reset** to client.cancelTimer 
- [ ] **Recreate VSIX** - can't dogfood extension until do this
- [ ] **Deploy** Try deploying to onrender and set new environment variable
- [ ] **Heartbeat for Backend** 
   - WIP: 
      - [ ] Rename func to onHeartbeatFunc
      - [ ] See TODO comment in mobClientServer.ts (heartbeat integration tests)
      - [ ] Change hard coded interval / timeout length when calling to read from env var
      - [ ] Stay awake without ever timing out (requires doing something every 14 minutes) 
      - [ ] Go to sleep (i.e., kill stay awake interval) after a certain amt. of inactivity (e.g., 2 hours)      
            - [ ] After server starts (i.e., start Sleep timer which will kill stay awake timer)
            - [ ] After any activity (i.e., kill and restart Go to sleep timer)
      - [ ] See todo comments in backendSocket.ts
   - Limits:
     - 750 hours running across all onrender services and 15 minutes of inactivity.  See [here](https://render.com/docs/free#free-web-services),  This is 31.25 days, so if you only
     have one service you could be up all the time, with two services you would have to do
     half time, unless you run them on separate accounts.
     - 500 free build minutes (should not be an issue).  See [here](https://render.com/pricing)
- [ ] **Heartbeat/Timeout Sniffing for Frontend** Maybe: Add clearInterval code to Timer.tsx (when timer is stopped, clear interval; when it's started, set interval). (Probably don't need a heartbeat, but investigate / sniff. May depend on browser caching.)
- [ ] **CONTROLLER unit tests** Jest - WIP (created controller.test.ts but have no tests implemented yet)
      - [x] changeFrontendStatus tests
      - [ ] more...
- [ ] **Sync all frontendMobTimer properties** differently:
      - possibly do this by adding MobTimer public set state() (similar to existing get state() but with care about using setSecondsRemaining... and mobName; and what to do if secondsRemaining is passed in greater than durationMinutes)
- [ ] **Manual tests (see below)**
- [ ] **Extension stops connecting** When deployed mobtimer backend times out, our vscode extension doesn't seem to connect to it properly
- [ ] **Unhardcode Mobname in Extension** WIP: Ethan (on branch)
- [ ] Consider - Bugs and easy refactoring in sections below (and watch out for tech debt):
- [ ] **Refactor Extension**
      - [ ] Dedupe Controller.toggleStatus and vscode-mobtimer.ts commands.registerCommand(TOGGLE_TIMER_COMMAND, () => {... code
      - [ ] **Refactor URL code more** in App.tsx and VscodeMobTimer.ts (and extension.ts)
      - [ ] **Refactor: remove UI code from controller**:
            - document.title should not be in the controller (inject something instead from App.tsx)
            - proposal: inject clockTickFunc modelled after whenExpiredFunc that the mob timer executes every second. The logic in intervals in front end, back end, and vscode extension can be moved into a function that is then injected.
      - [ ] **Add debug to VscodeMobTimer ctor** (refactor)
- [ ] **Sync linters on Joel & Ethan's environments** (Use issue: It's sometimes hard to see real diffs in the diff tool.
      Could this be  because of auto-formatting/spacing somehow being different between Joel & Ethan's dev environments?)

## Bugs ⚠️ 

- **SOCKET CONNECTION BUGS**
  - [ ] **Disconnect/reconnect bug**: join a mob, disconnect backend server, restart without changing to home page, fails - may have to recreate the socket.
  - [ ] **Gray out UI controls while connecting** 
      - Background:
            Message currently says "Service Unavailable - Try Refreshing Your Browser in 1-3 minutes".  On a clean start hen start all tasks and 
            join a mob for the first time, we get this error messag 
- **Verify bugs fixed for two mobs**
  - [ ] **Join Paused Mob bug**: When join mob where timer is paused, the timer shows 00:00 instead of the actual timer remaining.
  - [ ] **Join second mob bug**: Bug when you create 2 new mobs in separate tabs of the same browser, starting the timer for one mob sometimes also starts it for the 
      other mob. Fixed, Joel - verify
      - [ ] **Mob in Separate Tabs Bug** May be fixed by other bug fix.  Bug when you create 2 new mobs in separate tabs of the same browser, starting the timer for 
            on sometimes also starts it  for the other mob. This may depend on whether the back button has been used for one or more of the mobs. Having difficulty reproducing. It may 
            be that having the controller be a singleton is causing this issue. (Similarly, with multiple mobs open in different tabs, sometime the
            EditPariticants and EditRoles input boxes don't work correctly, i.e., when you click on the input box, it remains blank rather than revealing
            the current comma-separated values and can't type in the box; and when you exit the input box, it asks if you want to replace the values with 
            an empty string.) (Reproducible?) 
- [ ] **Play Sound Bug**: ⚠️ Play sound is blocked by some browsers if you join a mob but don't click to interact with the page in any way. We should
      handle this gracefully. In the meantime, the user can dismiss the error message and see the page content again by either 
      closing the error message (if available for that browser) or refreshing the page.
      Note: Mrozbarry's mobtimer gets around this by prompting you as follows (in the top right of his screen when you join):
            Sound Effects
            You previously enabled sound effects,
            do you want to enable this time, too?
            OKAY! / NOT NOW / NEVER
      - [ ] Review GitHub issues in mrozbarry's MobTime to look for more possible bugs in our code (maybe they fixed some bugs/nuanced issues 
            we don't know we have); also look at mrozbarry's unit tests and production code for more possible bugs/nuances we might not have considered
- [ ] **Bug: Participant/Role flaky** 
      - [x] Implement generally
      - [x] Unhardcode emojis for Navigator & Driver from browser tab title text
      - [ ] ⚠️ Get working consistently (currently flaky); probably replace current methodology with one of the following:
            - [ ] For each participant and role, show buttons for: ➕ add, ➖ remove, ⬆️ move up, and ⬇️ move down.
                  (Whatever the value in the input box is, just try to match it with the existing list for removal/moving/down.) 
                  - [ ] Later: Implement drag & drop for moving up/down
            - [ ] Instead of an input box for editing, just show a button that pops up a modal for editing the list.
                  - [ ] Note: If we still have window.confirm, we should replace it with a modal dialog since some browsers 
                        block popups and also it will be more user-friendly.           

## Misc

- [ ] Maybe: Add "localhost" to the text in browser (after "TEAM:") to make more obvious
- [ ] Follow up on: "Detected presence of yarn.lock. Using 'yarn' instead of 'npm' (to override this pass '--no-yarn' on the command line)."
- [ ] **VSIX script & task** - Add a script to update the vsix file, and call from tasks.json
- [ ] **Docker?** - Address node flakiness - e.g., maybe use Docker or GitPod or other VM
- [ ] **UI / Manual tests** (we are getting a lot of UI bugs, including repeat bugs that are fixed and then break again)
  - [ ] List out what needs to be tested manually (and automated if possible)
      - See completed.md for ideas, and...
      - Test in different browsers on PC, Mac, and mobile; with various screen widths, heights, and zoom levels
      - Test multiple mobs in different tabs and different browsers simultaneously
      - Test what happens when you join a mob and then disconnect the backend server and then reconnect (or when the backend server is down/times out)            
      - In the UI, manually test every scenario we have for the backend unit tests (start, pause, resume, cancel, add participant, etc...) (or automate if possible)
      - ...
      - ...
      - [ ] Code coverage
      - [ ] Maybe: Get UI tests working in App.test.tsx (look for .skip, etc.) - maybe see <https://reactjs.org/docs/testing-recipes.html>
- [ ] **Clean up UI**
      - [ ] More compact (to fit more on screen at 100% zoom)
      - [ ] Change browser tab title text for landing page            
      - [ ] Landing page: 
            - Make look more different from morozbarry's
            - Make more customer-centric; e.g., maybe a screenshot highlighting key features, such as the info in the browser tab
            - Create simpler SVG graphic on landing page so it looks like one equal team (not separate roles); and/or... 
                  Consider adding a royalty-free image with people, e.g., from pexels (Search: https://www.pexels.com/search/people%20collaborating%20around%20a%20computer/)
                  - E.G., Image of happy people around one computer: https://www.pexels.com/photo/excited-multiracial-colleagues-enjoying-triumph-together-in-front-of-laptop-in-office-3931634/
- [ ] **Add README.md to mobtimer-api**
- [ ] **CI/CD** 
- [ ] **cleanup console.log**

## Refactoring

- [ ] **Controller "God Object"** - Refactor Controller, which is becoming a "god object" (i.e., references too many things) and requires components to call it instead of just getting what the
      component needs. Possible remediations to try:
      - Try creating a generic StateVariable<T> class, so both the property and its React setter can be passed around together: [proposal](./proposal-generic-state-variable.md)
- [ ] Extract mobtimer-controller (refactor to share with both React mobtimer-frontend and mobtimer-vscode extension)
      - [ ] Refactor / cleanup:
            - [ ] where possible, don't use any types, e.g.:                  
                  // in mobSocketTestClient.ts:
                  private trackMessage(message: { data: string })
                  // in App.tsx:
                  client.webSocket.onmessage = (message: { data: string; })      
      - [ ] Decouple participants from MobTimer: 
            - [ ] Either:
                  - 1. Extract a superclass for MobTimer, called CountdownTimer, with a subclass called MobTimer that includes the Participants, or...
                  - 2. Rename MobTimer as CountdownTimer, and make Participants a separate class and just inject the rotate function into the  
                       CountdownTimer's timerExpireFunc
            - [ ] Use the decoupled CountdownTimer in the frontend, and rename frontendMobTimer as countdownTimer (since it never uses the
                  front end timer's participants functionality; it just uses the client and backend response)      
- [ ] **client.sendCommand** - Add client.sendCommand property for all commands, e.g., client.sendCommand.pause()

## Misc
- [ ] Get rid of # in URL - try BrowserRouter
  - [ ] Should we have something after main url and before room code?

## Participant UI (reorder, edit, delete, drag/drop)

- [ ] Proposal: create route for replacing all existing participants, all work done in UI
- [ ] UI: Reorder participants with drag/drop
- [ ] UI: Rename participant
- [ ] UI: Delete participant

# Should-Haves

- [ ] Notifications

# Pitch for front page

- [ ] Reg scheduled events
- [ ] Encourage pairing on real projects
- [ ] How this project was done

# Look at mrozzbarry code and discussions

- See [here](./mrozbarry.md)

# Could-Haves

- [ ] When update duration minutes, don't change the time remaining for the currently running timer (if
      running); just store in nextDurationMinutes (or similar)
- [ ] Handle illegal characters in mobName - show error in red message under field
- [ ] Trim mobName (and maybe url encode characters as needed)
- [ ] Handle trim(mobName) is empty
- [ ] Disable buttons as appropriate, e.g., if no legal mobName don't allow to click Join button
- [ ] In UI listener, handle if response is not successful
- [ ] Improve images in frontend
- [ ] Maybe: Change home page link for "Learn more about mob programming" to something of our own, such as a page on our mobtimer website
- [ ] Show all roles at all times (even when there are fewer than 2 participants)

# Enhancements

- [ ] Alarm for breaks, stretch, etc
- [ ] Set alarm duration / pausing
- [ ] Raise hand/make comments
- [ ] RPG
- [ ] Create ad hoc Lists (such as goals)
- [ ] User Epic
  - [ ] User identification / log in for people connected
  - [ ] Control who can join a session
- [ ] Feature: Find coding partners  
      - List of mob searchers, what looking for, and contact info
      - Bob Allen would like a social platform to connect people who want to mob - opt in, name, email, times want to mob, programming language preferences, etc.
- [ ] Info about Thursday morning group and potentially other groups (e.g., Thursday group is interested in rotating the driver at a different rate than the navigator)
  - [ ] List of mobbing groups
  - [ ] Link to channel in mobtimer Slack

# Rethink mobtimer-api

- [ ] Discuss: separate into different repos? see [Multi-Repo Proposal](./proposal-multiple-repos.md)
- [ ] solve websocket error - is this still an issue?
- [ ] try other socket client packages (tried socket.io-client, had trouble setting url)
- [ ] make more like other npmjs packages (no dist folder, figure out package.json)
- [ ] change to d.ts, create type library
- [ ] create separate time library?
- [ ] create separate mobtimerclient library?

# Refactor & Technical

- [ ] Try Postman and double-check Postman steps in documentation: [CONTRIBUTING](./mobtimer-backend/CONTRIBUTING.md)
- [ ] When deploy, is there a way for it to make a sound and/or other notification when done?
- [ ] correct anti-pattern? Pass business logic into UI (no mobtimer.xxxx) - however, consistent
- [ ] Use wav file directly instead of base64 encoded file to play pneumatic horn when time expires. The file is in
      the frontend "assets" folder, but not currently used. (There are 2 copies of the file, one using the original name
      and the other renamed to be shorter. don't currently use them. I tried the following, but it didn't work, perhaps
      because some additional configuration is needed to recognize .wav files and not treat them as text/html. Here's what
      I tried: const soundSource = "./assets/sound1828.wav";)
- [ ] Move as much logic out of App.tsx as possible (e.g., MVC / MVVM style decoupling)
- [ ] Clean up mobtimer-frontend/package.json - we might not need:
      "crypto": "^1.0.1",
      "http": "^0.0.1-security",
      "https": "^1.0.0",
      "net": "^1.0.2",
      "stream": "^0.0.2",
      "tls": "^0.0.1",
      "url": "^0.11.0",
- [ ] Think about names / whether to expose webSocket like this:
      await waitForSocketState(socket.webSocket, socket.webSocket.OPEN);
- [ ] Look at where we have timeouts and intervals and change code blocks to function (otherwise ms arg can be in
      wrong place - hard to see)
- [ ] Create utility functions to create timeout and interval objects that create the object and call unref() on it
      before returning it
- [ ] Investigate Eclipse, Intellij, & Visual Studio
- [ ] Review prior retros for generic lessons re. languages/environments/etc.
- [ ] Investigate improve gated checkin,else get rid of gated checkin requiring tests to pass
- [ ] Consider gated checkin testing with push instead of commit
- [ ] Look into TypeScript Modules .d.ts: <https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html>
- [ ] Write script to automatically start frontend and backend (currently documented in CONTRIBUTING.
- [ ] Set tsc options: target es2015 or later
- [ ] Backend
- [ ] Handle Bad Json Gracefully on Client (JSON.parse …)
- [ ] detectOpenHandles: Maybe try using --detectOpenHandles with Jest
- [ ] Maybe add timestamp to MobTimerResponse.actionInfo
- [ ] Persistence -
- [ ] Timeout: Should mobs be deleted on timeout (after period of inactivity)?
- [ ] Persist Mobs in case server is reset, etc. (e.g., in DB or other physical storage)
- [ ] Maybe: Try decorators - <https://www.typescriptlang.org/docs/handbook/decorators.html>
- [ ] Backend - Think about what to do if pause/resume/start methods are called when shouldn’t be (throw?)
- [ ] JavaScript template literals (refactoring): Consider using Javascript template literals instead of
      string concatenation, e.g., `${minutesPart}:${secondsPart}`;
- [ ] Figure out way to reduce spurious failing tests (in Jest)
- [ ] Handle console.log that complete after test completed?

# Security / Permanent Storage

- [ ] Security / Permanent Storage - TBD
