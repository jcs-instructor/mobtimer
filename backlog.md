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

## 5/15/2023 Agenda

- [ ] For Ethan, discuss how to find coding parter.  AgileVentures, codebuddies, mob programming channel
- [ ] Change default channel to dev
- [ ] Retro on last week while working separately and texting updates (What happened? How did that feel? etc.)
  - [ ] Should we continue divide and conquer outside?
- [ ] Stakeholder / general rollout plan
  - [ ] UI testing / customer release readiness / product stability

  - [ ] Decide on must haves for rollout to others
    - [ ] Specify mobtimer in vscode extension
    - [ ] Provide instructions for installing extension
    - [ ] Bugs
    - [ ] Home page changes?
    - [ ] Break timer?  Other differentiator?
  - [ ] Discuss approach with Thu morning mob
    - [ ] Would vscode extension be a big win?
    - [ ] Solicit desired enhancements
    - [ ] Show our list of enhancements
    - [ ] Incorporate their code into mobtimer
  - [ ] Discuss approach with Bob Allen's mob - differences?
  - [ ] Solicit others?  Ethan's gut - no if Bob Allen shows interest
- [ ] Competitor: mobster
- [ ] Priorities/goals for this week and beyond
  - [ ] New items
    - [ ] Create repo that includes mobtimer and mobtime-vscode-extension
    - [ ] Shared google email - discuss or add to backlog
    - [ ] Buy a domain - discuss or add to backlog.  Some options: xptogether, codingtogether/codetogether, cleancodingtogether (my favorite, although long)/cleancodetogether

- [ ] plan meeting times for rest of week, including possibly meeting Fri. instead of Tuesday

(If we don't meet today, then the above agenda topics could be for Tues. or Wed.) 

## Next

New,to be prioritized and be aware of
- [ ] PREP FOR CUSTOMERS TO USE STARTING THURS. 5/11/2023!!! Goal: Have good enough product deployed, stable, well tested before next Thursday AM mob 5/11/23 9am)
      - [ ] Fix script error: rm: cannot remove 'src/exports.tmp': No such file or directory
      - [ ] Follow steps in CONTRIBUTING.md to deploy (e.g., publish mobtimer-api, push to main, etc.)
       - [ ] Replace window.confirm with a modal (since some browsers block popups and also it will be more user-friendly) for:
            - [ ] Edit Participants
            - [ ] Edit Roles
      - [ ] Bugs: 
            - [ ] Bug: join a mob, disconnect backend server, restart without changing to home page, fails - may have to recreate the socket.
            - [ ] Join Paused Mob: When join mob where timer is paused, the timer shows 00:00 instead of the actual timer remaining.
                  - [ ] Joel - verify
            - [ ] Bug when you create 2 new mobs in separate tabs of the same browser, starting the timer for one mob sometimes also starts it for the 
                  other mob. Fixed, Joel - verify
            - [ ] Bug: participants and roles shows blank when save changes - could be done with defaultValue
            - [ ] Bug: Play sound is blocked by some browsers if you join a mob but don't click to interact with the page in any way. We should
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
            - [ ] Verify bug fix: Join Paused Mob: When join mob where timer is paused, the timer shows 00:00 instead of the actual timer remaining.
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
- [ ] Create ad hoc Lists (such as goals)
- [ ] User Epic
  - [ ] User identification / log in for people connected
  - [ ] Control who can join a session

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
