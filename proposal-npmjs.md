Phase 1 = symlink:

- Create virtual dir mobtimer-frontend/mobtimer-backend to point to mobtimer-backend/
- import xxx from '../mobtimer-backend/src/client

Phase 2

- Remove symlink
- Get frontend working
- Move mobtimer-backend/src/client to mobtimer-api
- Move any dependent files
- Move src files to src dir
- Create a package.json
- create a npmjs module from mobtimer-client that you can install with yarn
- Change import from src/client/xxx to import from <package name>
