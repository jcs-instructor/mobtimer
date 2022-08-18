## Timer - Minimum Deployable Features
- [ ] Resume with 
    - [ ] making App.js into App.tsx
    - [ ] .skip failing UI test (already in backlog to deal with it later)
- [ ] Start mob 
  - [ ] UI - Create a form for starting a mob. Result: acknowledge button is pressed and value of field) 
  - [ ] Join a mob from the above screen. Result: Message connected is displayed after connecting and whether you are the first one
- [ ] Developer setup
  - [ ] Create a start script (so don't have to cd every time)
  - [ ] Document mobtimer-frontend dev setup
- [ ] Create a timer 
  - [ ] UI - see Example React Source Code in resources.md) 
  - [ ] Hook up timer to websocket server 
  - [ ] Cancel 
  - [ ] UI - Start 
  - [ ] UI - Pause 
  - [ ] UI - Restart

## Split Repos and Deploy
- [ ] Split repos before deploy (see [background-and-decisions](./background-and-decisions.md))
- [ ] Deploy

## Timer - Minimum Features for Ethan & Joel to Use Instead of MobTi.me
- [ ] ...
## Other Features

- [ ] Mobbers, Roles, Rotate
- [ ] Settings: Sound, Notifications

## Other Technical
- [ ] Get UI tests working in App.test.tsx (look for .skip, etc.)
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
