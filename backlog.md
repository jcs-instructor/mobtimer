# Backlog

See also: [Reminders](./reminders.md), [Completed](./completed.md)

## Improve Later

- [ ] Low priority. Ethan after hours:
  - [ ] 2nd crack on start scripts, think about class vs function
  - [ ] In tasks.json, reorder tasks by order of execution
- [ ] Ethan - between sessions:
  - [ ] Upgrade to new version of nodemon (current ver. 2.0.19, latest ver. 2.0.20)
- [ ] Delete old unused branches

---

## Next

New,to be prioritized and be aware of
- [ ] ⚠️ Review backlog.md differences for awareness
- [ ] ⚠️ Review code differences for awareness and also questions, e.g.,
      - [ ] Code diff tool use issue: It's sometimes hard to see real diffs in the diff tool.
            Could this be  because of auto-formatting/spacing somehow being different between Joel & Ethan's dev environments?
      - [ ] Why are we joining the mob twice in the App.tsx?
            Why are do we have the mobName "front-end-timer" in App.tsx and "temp-not-to-be-used" in controller.ts?
            In App.tsx, why do we have a const mobName and also a state variable with the same name, i.e., in const [mobName, setMobName] = useState('')?
            Should the Room.tsx be the place for initializing the Controller frontend timer and client; i.e., after the mobName is entered,
            navigate to the room url and do the initializing there?
            (Note: Currently the landing page browser tab title text shows time remaining, etc., but really should just say "Mob Timer" or something like that.
            If we address the above questions, that might make the change easier.)
- [ ] PREP FOR CUSTOMERS TO USE:
      - [ ] Fix script error: rm: cannot remove 'src/exports.tmp': No such file or directory
      - [ ] Follow steps in CONTRIBUTING.md to deploy (e.g., publish mobtimer-api, push to main, etc.)
      - [ ] UI Edit Participants & Roles 
            - [x] Implement generally
            - [x] Unhardcode emojis for Navigator & Driver from browser tab title text
            - [ ] ⚠️ Get working consistently (currently flaky); probably replace current methodology with one of the following:
                  - [ ] For each participant and role, show buttons for: ➕ add, ➖ remove, ⬆️ move up, and ⬇️ move down.
                        (Whatever the value in the input box is, just try to match it with the existing list for removal/moving/down.) 
                        - [ ] Later: Implement drag & drop for moving up/down
                  - [ ] Instead of an input box for editing, just show a button that pops up a modal for editing the list.
                        - [ ] Note: If we still have window.confirm, we should replace it with a modal dialog since some browsers 
                              block popups and also it will be more user-friendly.
      - [ ] Bugs: 
            - [ ] ⚠️ Play sound is blocked by some browsers if you join a mob but don't click to interact with the page in any way. We should
                  handle this gracefully. In the meantime, the user can dismiss the error message and see the page content again by either 
                  closing the error message (if available for that browser) or refreshing the page.
                  Note: Mrozbarry's mobtimer gets around this by prompting you as follows (in the top right of his screen when you join):
                        Sound Effects
                        You previously enabled sound effects,
                        do you want to enable this time, too?
                        OKAY! / NOT NOW / NEVER
                  - [ ] Fix this bug
                  - [ ] Review GitHub issues in mrozbarry's MobTime to look for more possible bugs in our code (maybe they fixed some bugs/nuanced issues 
                        we don't know we have); also look at mrozbarry's unit tests and production code for more possible bugs/nuances we might not have considered
            - [x] Edit Participants and Roles: When edit participants or roles, if you press Enter, it submits without prompting you to confirm
            - [x] UI: Fix bug where not every countdown second appears (was reproducible if duration was set to 0.08888 min. or so)
            - [ ] Join Paused Mob: When join mob where timer is paused, the timer shows 00:00 instead of the actual timer remaining.
                  - [ ] Bug: join a mob, disconnect backend server, restart without changing to home page, fails - may have to recreate the socket.
                  - [x] Fix and test in UI
                  - [ ] I've added a failing test to mobClientServer.test.ts that reproduces the bug, which fails even for the first client (doesn't
                        require a 2nd client to join). Test is currently marked as skipped. I don't know why it still fails even though it succeeds in
                        the UI; maybe I need to do a clean all and then try again so it's using the latest mobTimer class, which has the fix
            - [x] Back Button: After adding people to a mob ("team1"), if you hit the back button in the browser and join a new mob ("team2"), you see 
                  the people from the previous mob ("team1") in the UI for the new mob ("team2")
            - [x] UI bug: UI sound not playing (again). Also, make sound play when get expired or reset message from server, rather
                  than relying entirely on the frontendmobtimer, which could be a fraction of a second out of sync with the server and other
                  clients, which could cause the sound to play when it should't (i.e., when someone else paused it just in time).
            - [x] UI bug: Time ticks can be very choppy.
            - [ ] Bug when you create 2 new mobs in separate tabs of the same browser, starting the timer for one mob sometimes also starts it 
                  for the other mob. This may depend on whether the back button has been used for one or more of the mobs. Having difficulty reproducing. It may 
                  be that having the controller be a singleton is causing this issue. (Similarly, with multiple mobs open in different tabs, sometime the
                  EditPariticants and EditRoles input boxes don't work correctly, i.e., when you click on the input box, it remains blank rather than revealing
                  the current comma-separated values and can't type in the box; and when you exit the input box, it asks if you want to replace the values with 
                  an empty string.) (Reproducible?) 
            - [ ] WIP/maybe the new message "Service Unavailable - Try Refreshing Your Browser in 1-3 minutes" is good enough?
                  - Background:
                        Bug on clean start: When start all tasks and join a mob for the first time, we get this error message
                        in the browser console: "The connection to ws://localhost:4000/ was interrupted while the page was loading." And
                        the play button says, "Start (temp hack)" -  it might be fixed by adding sleep for 2 seconds in the frontend start 
                        watch (to make sure other components are compiled first) (Note: On 5/5/23, I changed the message from "Start (temp hack)" 
                        to "Service Unavailable - Try Refreshing Your Browser in 1-3 minutes")              
      - [ ] ⚠️ UI Testing (we are getting a lot of UI bugs, including repeat bugs that are fixed and then break again)
            - [ ] List out what needs to be tested manually (and automated if possible)
            - [ ] Get UI tests working in App.test.tsx (look for .skip, etc.) - maybe see <https://reactjs.org/docs/testing-recipes.html>
      - [ ] Refactor: move any UI code out of Controller and call either from Timer.tsx or from onMessage.  Includes updateSummary and getActionButtonLabel.  
      - [ ] Clean up UI:
            - [x] Make time remaining text bigger
            - [x] Spacing of buttons, e.g., show vertically stacked buttons horizontally instead (e.g., Start & Cancel on one line; Rotate & Randomize on one line)
            - [ ] More compact (to fit more on screen at 100% zoom)
            - [ ] Change browser tab title text for landing page
            - [ ] Maybe: Change Cancel to X and put it next to Start button
            - [ ] Landing page: 
                  - Make look more different from morozbarry's
                  - Make more customer-centric; e.g., maybe a screenshot highlighting key features, such as the info in the browser tab
                  - Create simpler SVG graphic on landing page so it looks like one equal team (not separate roles); and/or... 
                    Consider adding a royalty-free image with people, e.g., from pexels (Search: https://www.pexels.com/search/people%20collaborating%20around%20a%20computer/)
                        - E.G., Image of happy people around one computer: https://www.pexels.com/photo/excited-multiracial-colleagues-enjoying-triumph-together-in-front-of-laptop-in-office-3931634/
- [ ] More backlog itesm: Move these to the correct priority/location in the backlog:
      - [ ] Add README.md to mobtimer-api
      - [ ] Add Joel to permission to publish mobtimer-api to npmjs.com
      - [ ] CI/CD 
      - [ ] cleanup console.log stms
- [ ] Refactor Controller, which is becoming a "god object" (i.e., references too many things) and requires components to call it instead of just getting what the
      component needs. Possible remediations to try:
      - Try creating a generic StateVariable<T> class, so both the property and its React setter can be passed around together: [proposal](./proposal-generic-state-variable.md)
- [ ] ON HOLD: Create VSCode extension (needed so we can use it ourselves) - see our vscode extension repo here:
      https://github.com/jcs-instructor/mobtimer-vscode/blob/main/backlog-vscode.md
- [ ] Extract mobtimer-controller (refactor to share with both React mobtimer-frontend and mobtimer-vscode extension)
      - [x] Decouple w3cwebsocket to allow choice of that or ws package (latter works in extension for mrozbarry) 
      - [x] Get unit test working with WS Web Socket Wrapper (already works for W3C wrapper) (check console log - already set up in .on in test client)     
      - [x] Split files by class (e.g., 3 files for 2 wrappers + 1 interface)
      - [ ] Use WS Web Socket Wrapper in extension
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
      - [ ] IMPORTANT: WE HAVE DUPLICATE CODE FOR CONTROLLER.TS!!!! - move to new repo: mobtimer-controller 

- [ ] Improve look by moving Cancel button om same row as timer and removing word "Cancel"
- [ ] Get rid of # in URL - try BrowserRouter
  - [ ] Should we have something after main url and before room code?
- [ ] Cleanup
  - [ ] Delete unused branches (?)

## Participant UI (reorder, edit, delete, drag/drop)

- [ ] Proposal: create route for replacing all existing participants, all work done in UI
- [ ] UI: Reorder participants with drag/drop
- [ ] UI: Rename participant
- [ ] UI: Delete participant

## Other Must-Haves

- [ ] Roles
- [ ] Turn on/off sound
- [ ] Notifications
- [ ] Home page must be more different from mobti.me. Change text, images, and appearance so they aren't confusingly similar or an obvious knock-off of mobti.me
- [ ] Images get in the way: (1) when screen narrows, (2) on mobile browser
- [x] Change home page link for "Learn more about mob programming" from Google search to something authoritative and unlikely to disappear or change unexpectedly for the worse over time, e.g., https://www.agilealliance.org/glossary/mob-programming/

## Pitch for front page

- [ ] Reg scheduled events
- [ ] Encourage pairing on real projects
- [ ] How this project was done

## Look at mrozzbarry code and discussions

- See [here](./mrozbarry.md)

## Could-Haves

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

## Enhancements
- [ ] Alarm for breaks, stretch, etc
- [ ] Set alarm duration / pausing
- [ ] Raise hand/make comments
- [ ] RPG
- [ ] Lists (such as goals)

NEW:
- [ ] Bob Allen would like a social platform to connect people who want to mob - opt in, name, email, times want to mob, programming language preferences, etc.
- [ ] Info about Thursday morning group and potentially other groups (e.g., Thursday group is interested in rotating the driver at a different rate than the navigator)
  - [ ] List of mobbing groups
- [ ] List of mob searchers, what looking for, and contact info
- [ ] Link to channel in mobtimer Slack

## rethink mobtimer-api

- [ ] Discuss: separate into different repos? see [Multi-Repo Proposal](./proposal-multiple-repos.md)
- [ ] solve websocket error - is this still an issue?
- [ ] try other socket client packages (tried socket.io-client, had trouble setting url)
- [ ] make more like other npmjs packages (no dist folder, figure out package.json)
- [ ] change to d.ts, create type library
- [ ] create separate time library?
- [ ] create separate mobtimerclient library?

## Refactor & Technical

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

## Security / Permanent Storage

- [ ] Security / Permanent Storage - TBD
