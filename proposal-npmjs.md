Phase 1 = symlink:

- Create virtual dir mobtimer-frontend/mobtimer-backend to point to mobtimer-backend/
- import xxx from '../mobtimer-backend/src/client

Phase 2

- Move mobtimer-backend/src/client dependencies on mobtimer-backend/src into mobtimer-backend/src
- create a npmjs module from mobtimer-backend that you can install with yarn
- Change import from src/client/xxx to import from <package name>
