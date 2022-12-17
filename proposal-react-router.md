React Router

- [x] Create route for /hello that goes to screen with hello
- [x] Create route for / that goes to the current landing page (Welcome to Amazing Timer)
- [x] Create Room page that has just the Start/Pause button
- [x] When submit button, navigate(/:id)
- [x] Create route for /:id
- [x] Read mobName parameter and display in ActionButton
- [ ] Support joining multiple mobs from UI. 
      - Currently after joining a mob on the home page, if you try to join another mob, you get to a page with a non-working action button. 
      - Also, even if you just join one mob, such as 'abc1' and then try to go back to the home page, if you go back to the /abc1 page, the action button doesn't work correctly.
      - In App.tsx, we currently have the client as a global variable, but we'll probably need one client per mob joined, similar to what we have in the mobClientServer.test.ts, e.g.:
            const client = await openSocket(url);
            await client.joinMob(_mobName1);
            const client2 = await openSocket(url);
            await client2.joinMob(_mobName2);
- [ ] Create new component MobTimer.tsx which includes ActionButton and displays mobName.
  - [ ] Route to MobTimer instead of MobTimer
- [ ] Refactoring:
  - [ ] JoinMobForm: create new submitForm function that takes parameter event, executes event.preventDefault and submitJoinMob
  - [ ] call submitForm instead of submitJoinMob and remove event parameter from submitJoinMob
  - [ ] move navigate call to submitForm
- [ ] Move parameters used by JoinMobForm to MobTimer
  - [ ] Use mobName URL parameter and remove mobName/setMobName from everywhere
