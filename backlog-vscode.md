# VS Code Extension

## Intro

Goal: Use mrozzbarry with minimal edits

## Resources

- Example of another timer in VSCode (author: jan25) - https://github.com/jan25/vscode-timer/blob/master/src/extension.ts
- Tutorial: https://vscode-docs.readthedocs.io/en/stable/extensions/example-word-count/
- Microsoft Docs: https://github.com/microsoft/vscode-extension-samples/blob/main/statusbar-sample/src/extension.ts
- Ethan's convo w/mrozbarry: https://github.com/mobtimeapp/mobtime-vscode-extension/issues/2

## Must Haves for Ethan & Joel

- [x] Show some text in statusbar
- [x] Join (ok to hardcode)
- [x] Statusbar
    - [x] Time remaining
    - [x] Start/Pause
            const resetTimerLabel = '$(clock) Reset timer';
            const cancelTimerLabel = '$(close) Cancel timer';

## Should Haves for Ethan and Joel
- [ ] See if can run Hello World when extension loads instead of having to run it as a task
- [ ] WIP: CONTRIBUTING.md - Review [here](./CONTRIBUTING.md)
- [ ] Rename hello world everywhere
- [ ] Refactor/Cleanup: Remove code that was added just for mrozbarry (currently commented out - in mobSocketServer.ts in 2 places: _initialize, etc.)

## Must Haves for Other People
- [ ] Specify Mob Names
- [ ] Instructions for running in debug mode
- [ ] Instructions for installing
- [ ] Use mobtimer-api directly, create combined github repo

## Should Haves for other people
- [ ] Join, and see all default fields
- [ ] (Add who's Navigator next to time on bottom)
- [ ] Duration
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
