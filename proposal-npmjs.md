Try This:

- Get frontend working
- Move mobtimer-backend/src/client to mobtimer-api
- Move any dependent files from mobtimer-backend/src to mobtimer-api
- Move src files to src dir
- Install any packages that are imported
- create a npmjs module from mobtimer-client that you can install with yarn
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
