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
  - clone mobtimer-api and remove all directories except mobtimer-api
  - move all files in mobtimer-api up a level
  - move src folder and any other folders up a level
- repeat for mobtimer-frontend
  - now you can start using in mobtimer-frontend
- create a new repo mobtimer
  - set up git for new repo
  - copy all files from mobtimer root dir to the repo
- rename mobtimer repo to mobtimer-backend
  - delete all files from root dir of mobtimer
  - move all files in mobtimer-backend up a level

Note: The following didn't work when we tried it:

symlink:

- Create virtual dir mobtimer-frontend/mobtimer-backend to point to mobtimer-backend/
- import xxx from '../mobtimer-backend/src/client
