Try This:

- [X] Get frontend working
- [X] Move mobtimer-backend/src/client to mobtimer-api
- [X] Move any dependent files from mobtimer-backend/src to mobtimer-api
- [X] Move src files to src dir
- Prepare for packaging:      
      - [X] cd mobtimer-api
      - [X] rm -rf node_modules
      - [X] cp ../mobtimer-backend/tsconfig.json .
      - [X] npm init
 
      - [X]     commit
      - [X]     create mobtimer-api/src/index.ts file that imports and exports everything
      - [X]     add main: dist/index.js to package.json
      - [X]     add scripts: { build: tsc } to package.json
      - [X]     modify tsconfig.js to complile types (d.ts)
      - [X]     add dist to .gitignore
      - [X]     create empty .npmignore
      - [X]     commit
 
      - [X] yarn add ws
 
      - [ ]     inspect package.json
      - [ ]     commit
 
      - [ ] yarn build
      - [ ] npm link
      - [ ] cd ../mobtimer-backend
      - [ ] rm -rf node_modules
      - [ ] npm link mobtimer-api

      - [ ]     fix imports

      - [ ] npm test

      - [ ]     fix issues

      - [ ] cd ../mobtimer-api
      - [ ] npm package

      - [ ]     inspect package

-----------------

- create a npmjs module from mobtimer-client that you can install with yarn
- add index.ts which imports and exports all files
-
- Change import from src/client/xxx to import from <package name>
- add package to mobtimer-backend and test
- create repository mobtimer-api
  - push repository mobtimer into mobtimer-api
  - clone mobtimer-api locally
  - remove all files at root level
  - remove all directories at root level except mobtimer-api
  - move all files in mobtimer-api up a level
  - move src folder and any other folders up a level
- repeat for mobtimer-frontend
  - now you can start using in mobtimer-frontend
- repeat for mobtimer-backend
- modify mobtimer to be a master repo
  - remove mobtimer-api, mobtimer-frontend, and mobtimer-backend
  - create submodules for these repos

Note: The following didn't work when we tried it:

symlink:

- Create virtual dir mobtimer-frontend/mobtimer-backend to point to mobtimer-backend/
- import xxx from '../mobtimer-backend/src/client


- [ ] (Joel) npm add owner ethanstrominger mobtimer-api
- [X] cleanup: remove unneeded dependencies in mobtimer-api/package.json