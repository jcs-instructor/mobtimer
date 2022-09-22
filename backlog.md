# Backlog

- [] Note: See also [Reminders](./reminders.md)

## Timer - Minimum Deployable Features

- [x] making App.js into App.tsx
- [x] create CONTRIBUTING.md for frontend
- [x] .skip failing UI test (already in backlog to deal with it later)
- [x] Merge from npmjs branch to main
- [x] package mobtimer-api (see proposal-npmjs.md)
- [x] Fix this: start shell files don't launch the ui in a browser window currently
- [ ] Start mob
  - [x] UI - Create a form for starting a mob. Result: acknowledge button is pressed and value of field)
  - [x] Make a package to share code between back and front ends (See proposal-npmjs.md for more details)
  - [ ] Join a mob from the above screen. Result: Message connected is displayed after connecting and whether you are the first one
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

- [ ] In tasks.json, unharcode firefox browser (there may be a windows way of specifying 'default browser exe'...?)
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
