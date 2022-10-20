## Timer - Minimum Deployable Features

- [x] making App.js into App.tsx
- [x] create CONTRIBUTING.md for frontend
- [x] .skip failing UI test (already in backlog to deal with it later)
- [x] Merge from npmjs branch to main
- [x] package mobtimer-api (see proposal-npmjs.md)
- [x] Make a package to share code between back and front ends (See proposal-npmjs.md for more details)
- [x] Developer setup
  - [x] Create a start script (so don't have to cd every time)
  - [x] Document mobtimer-frontend dev setup

19-Oct

- [x] **WIP**

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
    - [x] **Review above**
