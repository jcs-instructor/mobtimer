# Development

## Windows PC Setup

In VS Code, set your default terminal to Git Bash as follows (needed for "startAll" task to work on PC):

- Press CTRL + SHIFT + P to open the Command Palette.
- Search for “Terminal: Select Default Profile” (previously “Terminal: Select Default Shell”)
- Select “Git Bash”

## Initial Setup

- From the Terminal:

  ```
  git clone [this repository name here]
  cd [this repository name here]
  ```

- Run clean-all script to execute yarn:
  ```
  ./scripts/clean-all.sh
  ```

## Start All Components

To start all components (frontend server, backend server, and api build):

In VS Code,

- Press CTRL + SHIFT + P to open the Command Palette
- Search for "Tasks: Run Task"
- Search for "startAll" and select it

## Making Code Changes

- Change code as desired
- Push to development branch

### Adding a New Feature

Files to change:
- mobtimer-api:
  - test:
    - mobTimer.test.ts 
  - src:
    - action.ts src
    - mobSocketClient.ts
    - mobTimerRequests.ts
- mobtimer-backend:
  - test: 
    - mobClientServer.test.ts 
  - src:
    - server: 
      - mobSocketServer.ts 

### Making Changes to Icons

Icons were created using Ethan Strominger's gmail account:

- https://pixelied.com/editor/design/6428399563ff01432c82a888
- https://cloudconvert.com/

## Helper Scripts

All these scripts are contained in the scripts directory and should be executed
from the root directory:

- symlink-ls.sh - displays index.\* in linked directories and in mobtimer-api
- symlink-mobtimer-api-backend.sh - creates symbolic link in mobtimer-backend/node_modules/mobtimer-api. Called by start-frontend.sh (which is called from tasks.json)
- symlink-mobtimer-api-frontend.sh - creates symbolic link in mobtimer-backend/node_modules/mobtimer-api. Called by start-backend.sh (which is called from tasks.json)
- symlink-mobtimer-api-watch.sh - calls symlink-mobtimer-api and waits for changes in source dir to relink. Called from tasks.json
- symlink-mobtimer-api-no-watch.sh - calls scripts to create frontend and backend sym links for frontend and backend. Called from symlink-mobtimer-api-watch.sh (which is called from tasks.json)
- symlink-root-for-jest.sh - creates links required to run backend tests from root.
- compile-api-no-watch.sh - compiles mobtimer-api and calls symlink-mobtimer-api.sh. Called from tart-mobtimer-api.
- start-backend-watch.sh - calls symlink-mobtimer-backend. Compiles backend and starts backend server. Recompiles backend if any changes to backend src files.
- start-frontend-watch.sh - Compiles frontend and starts frontend server. Recompiles backend if any changes to frontend files.
- compile-mobtimer-api-watch.sh - calls compile-api-no-watch and waits for changes.

When you need to refresh node_modules in frontend or backend, run ../scripts/clean-all.sh

- clean-all.sh must be run. Removes the dist and node_module directories, and reruns yarn.

## See also

See additional CONTRIBUTING.md files

- [Frontend]](./mobtimer-frontend/CONTRIBUTING.md)
- [Backend]](./mobtimer-backend/CONTRIBUTING.md)
- [API]](./mobtimer-api/CONTRIBUTING.md)

# Production Deployment

## One-time setup

### Frontend

- On render.com, create static website
  - Name: mobtimer-frontend
  - Root Directory: mobtimer-frontend
  - Build Command: yarn; yarn build
  - Click "Create Static Website" button at bottom to save
  - Click Environment and add variable:
    - Key: REACT_APP_WEBSOCKET_URL
    - Value: paste url from the backend web service and change https to wss (e.g., wss://mobtimer-backend-pj2v.onrender.com)
  - Click link at top left corner of page to view in web browser - note: it might take a few minutes to be available (e.g., https://mobtimer-frontend-iwa7.onrender.com)

### Backend

- On render.com, create web service
  - Name: mobtimer-backend
  - Root Directory: mobtimer-backend
  - Build Command: yarn; yarn build
  - Click "Create Web Service" button at bottom to save
  - Once complete, click on the link to the web service (at top left corner of the screen). Browser should open with message "http server started"
  - Copy link to web service (at top left corner of page, e.g., https://mobtimer-backend-pj2v.onrender.com/) for use when deploying frontend )
- (Optional) Test using Postman app - for more details see https://blog.postman.com/postman-supports-websocket-apis/
  - Click on My Workspace
  - Click on New
  - Click on Websocket Request
  - Paste previously copied link and change https to wss
  - Click Connect
  - Send the message "Test". A message something like {"actionInfo":{"action":"invalidRequestError"}} will be returned.

## Subsequent deployments

- Publish the API:

  ```
  cd mobtimer-api
  ./publish-no-watch.sh
  ```

- Push to main branch
