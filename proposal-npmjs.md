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
 
      - [X]     inspect package.json
      - [X]     commit
 
      - [X] yarn build
      - [X] npm link
      - [X] cd ../mobtimer-backend
      - [X] rm -rf node_modules
      - [ ] yarn
      - [X] npm link mobtimer-api

      - [X]     fix imports

      - [X] npm test

      - [X]     fix issues

      - [X] cd ../mobtimer-api
      - [X] npm pack

      - [X]     inspect package


- [X] (Joel) npm owner add ethanstrominger mobtimer-api
- [X] cleanup: remove unneeded dependencies in mobtimer-api/package.json