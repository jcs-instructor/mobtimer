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
- [ ] Review backlog.md differences for awareness
- [ ] PREP FOR CUSTOMERS TO USE STARTING THURS. 5/11/2023!!! Goal: Have good enough product deployed, stable, well tested before next Thursday AM mob 5/11/23 9am)
      - [ ] Fix script error: rm: cannot remove 'src/exports.tmp': No such file or directory
      - [ ] Follow steps in CONTRIBUTING.md to deploy (e.g., publish mobtimer-api, push to main, etc.)
      - [ ] Bugs: 
            - [x] Edit Participants Syncing: Need to update the input box for editing participants whenever participants change; i.e., after:
                  - add
                  - rotate
                  - randommize
                  - update (i.e., trimmed values)
                  - etc.
            - [x] Join Paused Mob: When join mob where timer is paused, the timer shows 00:00 instead of the actual timer remaining.
                  - [x] Fix and test in UI
                  - [ ] I've added a failing test to mobClientServer.test.ts that reproduces the bug, which fails even for the first client (doesn't
                        require a 2nd client to join). Test is currently marked as skipped. I don't know why it still fails even though it succeeds in
                        the UI; maybe I need to do a clean all and then try again so it's using the latest mobTimer class, which has the fix
            - [ ] Back Button: After adding people to a mob ("team1"), if you hit the back button in the browser and join a new mob ("team2"), you see 
                  the people from the previous mob ("team1") in the UI for the new mob ("team2")
            - [ ] WIP/maybe the new message "Service Unavailable - Try Refreshing Your Browser in 1-3 minutes" is good enough?
                  - Background:
                        Bug on clean start: When start all tasks and join a mob for the first time, we get this error message
                        in the browser console: "The connection to ws://localhost:4000/ was interrupted while the page was loading." And
                        the play button says, "Start (temp hack)" -  it might be fixed by adding sleep for 2 seconds in the frontend start 
                        watch (to make sure other components are compiled first) (Note: On 5/5/23, I changed the message from "Start (temp hack)" 
                        to "Service Unavailable - Try Refreshing Your Browser in 1-3 minutes")              
      - [ ] Refactor: move any UI code out of Controller and call either from Timer.tsx or from onMessage.  Includes updateSummary and getActionButtonLabel.  
      - [ ] Clean up UI:
            - Spacing of buttons
            - More compact (to fit more on screen)?
            - Change Cancel to X and put it next to Start button
            - Landing page: 
                  - Make look more different from morozbarry's
                  - Make more customer-centric; e.g., maybe a screenshot highlighting key features, such as the info in the browser tab
                  - Create simpler SVG graphic on landing page so it looks like one equal team (not separate roles); and/or... 
                    Consider adding a royalty-free image with people, e.g., from pexels (Search: https://www.pexels.com/search/people%20collaborating%20around%20a%20computer/)
                        - E.G., Image of happy people around one computer: https://www.pexels.com/photo/excited-multiracial-colleagues-enjoying-triumph-together-in-front-of-laptop-in-office-3931634/
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

## Enhancements
- [ ] Alarm for breaks, stretch, etc
- [ ] Set alarm duration / pausing
- [ ] Raise hand/make comments
- [ ] RPG
- [ ] Lists (such as goals)

NEW:
- [ ] Info about Th morning group and potentially other groups
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

- [ ] Review GitHub issues in mrozbarry's MobTime to look for possible test cases for our mob timer (maybe they fixed some bugs/nuanced issues we don't even know we have)
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
- [ ] Get UI tests working in App.test.tsx (look for .skip, etc.) - maybe see <https:
      //reactjs.org/docs/testing-recipes.html>
  - [ ] Look into TypeScript Modules .d.ts: <https:
        //www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html>
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
