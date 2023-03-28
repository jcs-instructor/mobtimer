# Epics / Categories

<details><summary>Finish deploy</summary><blockquote>

- Copy changes from mobtimer-new repo, mobtimer-frontend</summary>

- <details><summary> Deploy mobtimer-frontend to render.com (or vercel.com)</summary><blockquote>

  - [ ] Set REACT_APP_WEBSOCKET_URL to something like: wss://final1-u56m.onrender.com
  - [ ] Verify working
  - [ ] Update CONTRIBUTING.md

</blockquote></details>

</blockquote></details>

<details><summary>Participant UI (reorder, edit, delete, drag/drop)</summary><blockquote>

- [ ] Proposal: create route for replacing all existing participants, all work done in UI
- [ ] UI: Reorder participants with drag/drop
- [ ] UI: Rename participant
- [ ] UI: Delete participant

</details></blockquote>

<details><summary>Pitch for front page</summary><blockquote>

- [ ] Reg scheduled events
- [ ] Encourage pairing on real projects
- [ ] How this project was done

</blockquote></details>

<details><summary>Additional features</summary><blockquote>

<details><summary>Must Have</summary><blockquote>

- [ ] Randomize order
- [ ] Roles
- [ ] Cancel

</blockquote></details>

<details><summary>Should Have features</summary><blockquote>

- [ ] Turn on/off sound
- [ ] Notifications

</blockquote></details>
  
<details><summary>Could Have</summary><blockquote>

- [ ] When update duration minutes, don't change the time remaining for the currently running timer (if running); just store in nextDurationMinutes (or similar)
- [ ] Handle illegal characters in mobName
- [ ] Trim mobName (and maybe url encode characters as needed)
- [ ] Handle trim(mobName) is empty
- [ ] Disable buttons as appropriate, e.g., if no legal mobName don't allow to click Join button
- [ ] In UI listener, handle if response is not successful

</blockquote></details>
  
<details><summary>Investigate</summary><blockquote>

- [ ] WIP: Bug on clean start: When start all tasks and join a mob for the first time, we get this error message in the browser console: "The connection to ws://localhost:4000/ was interrupted while the page was loading." And the play button says, "Start (temp hack)" - Not reproducible on Ethan's machine - On Joel's machine, it might be fixed by adding sleep for 2 seconds in the frontend start watch (to make sure other components are compiled first)

</blockquote></details>

</blockquote></details>

<details><summary>Enhancements</summary><blockquote>

- [ ] Alarm for breaks, stretch, etc
- [ ] Set alarm duration / pausing
- [ ] Raise hand/make comments
- [ ] RPG
- [ ] Lists (such as goals)

</blockquote></details>

<details><summary>Create VSCode version</summary><blockquote>
- [ ] TBD

</blockquote></details>

<details><summary>Refactor & Technical</summary><blockquote>

<details><summary>rethink mobtimer-api</summary><blockquote>

- [ ] separate into different repos? see [Multi-Repo Proposal](./proposal-multiple-repos.md)
- [ ] refactor mobtimerclient to take a socket
- [ ] solve websocket error
- [ ] make npmjs package more like other packages
- [ ] change to d.ts, create type library
- [ ] create separate time library?
- [ ] create separate mobtimerclient library?

</blockquote></details>

<details><summary>Other</summary><blockquote>

- [ ] correct anti-pattern? Pass business logic into UI (no mobtimer.xxxx) - however, consistent
- [ ] Use wav file directly instead of base64 encoded file to play pneumatic horn when time expires. The file is in the frontend "assets" folder, but not currently used. (There are 2 copies of the file, one using the original name and the other renamed to be shorter. don't currently use them. I tried the following, but it didn't work, perhaps because some additional configuration is needed to recognize .wav files and not treat them as text/html. Here's what I tried: const soundSource = "./assets/sound1828.wav";)
- [ ] Move as much logic out of App.tsx as possible (e.g., MVC / MVVM style decoupling)
- [ ] Clean up mobtimer-frontend/package.json - we might not need:
      "crypto": "^1.0.1",
      "http": "^0.0.1-security",
      "https": "^1.0.0",
      "net": "^1.0.2",
      "stream": "^0.0.2",
      "tls": "^0.0.1",
      "url": "^0.11.0",
- [ ] Use webSocketType instead of W3CWebSocket (decoupling)
      export function waitForSocketState(
      socket: W3CWebSocket,
      socket: { readyState: number },
- [ ] Think about names / whether to expose webSocket like this:
      await waitForSocketState(socket.webSocket, socket.webSocket.OPEN);
- [ ] Look at where we have timeouts and intervals and change code blocks to function (otherwise ms arg can be in wrong place - hard to see)
- [ ] Create utility functions to create timeout and interval objects that create the object and call unref() on it before returning it
- [ ] Investigate Eclipse, Intellij, & Visual Studio
  - [ ] Review prior retros for generic lessons re. languages/environments/etc.
- [ ] Investigate improve gated checkin,else get rid of gated checkin requiring tests to pass
  - [ ] Consider gated checkin testing with push instead of commit
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
- [ ] Handle console.log that complete after test completed?

</blockquote></details>
</blockquote></details>

<details><summary>Security / Permanent Storage / Persistence</summary><blockquote>
- [ ] TBD
</blockquote></details>
