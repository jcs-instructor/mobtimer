# VS Code Extension

## Intro

Goal: Use mrozzbarry with minimal edits

## Resources

- https://vscode-docs.readthedocs.io/en/stable/extensions/example-word-count/
- https://github.com/mobtimeapp/mobtime-vscode-extension/issues/2
- https://github.com/microsoft/vscode-extension-samples/blob/main/statusbar-sample/src/extension.ts

## Must Haves for Ethan & Joel

- [ ] Join, and see all default fields
  - [ ] WIP: Handle wss://localhost:4000/mobname (see mobSocketServer.ts TODO comment which includes sample code)
  - [ ] Time remaining in sidebar and bottom
  - [ ] Duration
  - [ ] Participants
- [ ] Start, Pause at bottom
- [ ] Refactor/Cleanup: Remove code that was added just for mrozbarry (currently commented out - in mobSocketServer.ts in 2 places: _initialize, etc.)

## Must Haves for Other People

- [ ] (Add who's Navigator next to time on bottom)
- [ ] Manage participants
- [ ] Randomize
- [ ] Manage Roles
- [ ] Stop, Cancel, Rotate
- [ ] Required if and when merging to mrozzbarry (change our fork here: https://github.com/jcs-instructor/mobtime-vscode-extension)
  - [ ] Configure URL
    - [ ] replace all localhost:4000 with mobti.me and figure out how to configure URL

## Completed VSCode Extension tasks

- [x] Create a separate helloworld vscode plugin (to learn) on a branch (see https://code.visualstudio.com/api/get-started/your-first-extension)
- [x] Fork mrozzbarry repo - https://github.com/jcs-instructor/mobtime-vscode-extension
- [x] Get forked code working as is with the current mobti.me url (from our copy in our codebase)
- [x] Modify url to use our server: localhost:4000; and modify mrozberry code on fork here: https://github.com/jcs-instructor/mobtime-vscode-extension
