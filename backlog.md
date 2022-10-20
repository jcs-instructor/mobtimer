# Backlog

- [] Note: See also [Reminders](./reminders.md)

## Timer - Minimum Deployable Features

- [x] making App.js into App.tsx
- [x] create CONTRIBUTING.md for frontend
- [x] .skip failing UI test (already in backlog to deal with it later)
- [x] Merge from npmjs branch to main
- [x] package mobtimer-api (see proposal-npmjs.md)
- [x] Make a package to share code between back and front ends (See proposal-npmjs.md for more details)

- [ ] **WIP**

  - [x] gated checkin - don't allow checkin if tests are failing
  - [x] Overcome zlib compilation error
    - [x] downgrade to React 4 (works)
    - [x] upgrade to React 5
    - [x] Reorganize/refactor API (backend first)
      - [x] Duplicate testUtils.ts and WebSocketClient to backend, remove from API (fix frontend later)
      - [x] Moved dependencies to devDependencies
      - [x] Remove all npm packages from api
      - [x] Componentize webSocket in mobWebSocketClient
      - [x] Add id to messages and wait for specific id in addition to waiting for close
      - get tests to work
      - [x] change to wc3websocket (more fragile, so will make sturdier)
      - [x] move all code from testUtils and webSocketClient that does not use npm package to api
    - [x] Get frontend to work
      - [x] Add console.log after joining
    - [X] **Review above**
    - [ ] Consider creating utilty functions to create timeout and interval objects that create the object and call unref() on it before returning it
    - [ ] See [proposal-refactor.md](./proposal-refactor.md)
    - [ ] Fix two tests marked as skip
      - [ ] Consider other options for getting last message (write to file, send last message and check for it)
    - [ ] inspect other two mob tests
    - [ ] review [proposal-message-structure.md](./proposal-message-structure.md)
    - [ ] move husky check for testing to push to make quicker
    - [ ] demo no-verify
    - [ ] demo runAll task
    - [ ] refactor: deduplicate testUtils.ts, mobClientSocket.ts
      - [ ] leave socket implementationduplicated, further componenentize socket?
      - [ ] refactor: relook at how onMessage is implemented and only do for backend
      - [ ] refactor: review past proposals to cleanup

- [ ] Start mob

  - [x] UI - Create a form for starting a mob. Result: acknowledge button is pressed and value of field)
  - [ ] See [proposal for web socket client](./proposal-websocketclient.md)
        [x] Google zlib errors with react
        [x] Or use a different web socket library that works well with react
        [x] Test can connect to mob
  - [ ] When user joins a mob from the UI, show message "connected"

- [ ] **Discuss HyperApp, ferp, mrbarry VS React**

  - [ ] Pros and Cons
  - [ ] HyperApp, ferp tutorials?
  - [ ] Reduce mrbarry code

- [ ] Windows Shell Files: Fix this: start shell files don't work in Windows (temporary workaround: manually open ./start-backend.sh and ./start-frontend)
      (CONSIDER MOVING THIS TO TECHNICAL IF NOT IMMEDIATE PRIORITY)
- [ ] Make default port different for frontend & backend
- [ ] Make ports configurable (on frontend & backend)
- [ ] Make WebSocketServer url configurable (frontend)
- [ ] Developer setup
  - [ ] Create a start script (so don't have to cd every time)
  - [ ] Document mobtimer-frontend dev setup
- [ ] Create a timer
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
