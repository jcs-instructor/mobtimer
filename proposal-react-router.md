React Router

- [x] Create route for /hello that goes to screen with hello
- [x] Create route for / that goes to the current landing page (Welcome to Amazing Timer)
- [x] Create Room page that has just the Start/Pause button
- [x] When submit button, navigate(/:id)
- [x] Create route for /:id
- [x] Read mobName parameter and display in ActionButton
- [ ] Create new component MobTimer.tsx which includes ActionButton and displays mobName.
  - [ ] Route to MobTimer instead of MobTimer
- [ ] Refactoring:
  - [ ] JoinMobForm: create new submitForm function that takes parameter event, executes event.preventDefault and submitJoinMob
  - [ ] call submitForm instead of submitJoinMob and remove event parameter from submitJoinMob
  - [ ] move navigate call to submitForm
- [ ] Move parameters used by JoinMobForm to MobTimer
  - [ ] Use mobName URL parameter and remove mobName/setMobName from everywhere
