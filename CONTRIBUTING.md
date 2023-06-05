# Development

## Windows PC Setup

In VS Code, set your default terminal to Git Bash as follows (needed for some tasks to work on PC):

- Press CTRL + SHIFT + P to open the Command Palette.
- Search for “Terminal: Select Default Profile” (previously “Terminal: Select Default Shell”)
- Select “Git Bash”

## Initial Setup

From the Terminal:

  ```
  git clone [this repository name here]
  cd [this repository name here]
  npm install -g nodemon
  npm install -g ts-node
  ```Run clean all task to execute yarn:

  In VS Code,

  - Press CTRL + SHIFT + P to open the Command Palette
  - Search for "Tasks: Run Task"
  - Run "mobtimer all tasks"


## Start All Components

To start all components (frontend server, backend server, and api build):

In VS Code,

- Press CTRL + SHIFT + P to open the Command Palette
- Search for "Tasks: Run Task"
- Run task "mobtimer step 3 - start watch" 
  - If get compilation or runtime errors, consider running task "mobtimer all steps"

## Making Code Changes

- Change code as desired
- Push to development branch
- If you want to deploy changes, see Subsequent deployments" section (below)

### API changes

- If the changes need to be consumed by VSCode extension or deploying to web, publish to npm

### Adding a New Feature

#### VSCode extension changes

See vscode [CONTRIBUTING.md](./mobtimer-vscode/CONTRIBUTING.md)

#### Backend Changes

Files to change:

- mobtimer-api:
  - test:
    - mobTimer.test.ts
  - src:
    - action.ts
    - mobSocketClient.ts
    - mobTimerRequests.ts
- mobtimer-backend:
  - test:
    - mobClientServer.test.ts
  - src:
    - server:
      - mobSocketServer.ts

#### Frontend Changes

- Decide on a name for the screen or screen fragment (for instance, Goals)

- If adding a "React fragment" to an existing screen (e.g, say you wanted to put Goals on the same screen as Room.tsx)
  - Identify where you want the React fragment to be displayed
  - Open the corresponding tsx (e.g., Room.tsx)
  - Decide on a name for the fragment. Use that name where you see _fragment name_ below
  - You will see a bunch of calls to React framents (e.g., <Participants/ >)
  - Add <_fragment name_/ > to the tsx file
  - Find a similar screen fragment and copy. For instance, if
    - creating a screen for goals, copy participants.tsx which allows you to add, modify, and delete records.
    - adding a button, look at Reset.tsx (may be renamed to Cancel.tsx) which contains a single button
  - If the attribute appears on other screens or screen fragments, you will need to pass a set function. See setMobName as an example.
- Modify Controller.tsx (previous step should lead you to doing that)

- If a new screen
  - create a new tsx file that will call other React fragments (see Room.tsx for an example)
  - add Routes to App.tsx
  - modify code to call the Route
  - now add a React fragment to the tsx you created using instructions for adding a React fragment

### Adding/Changes to Images

- Create an image using your favorite drawing tool
- Save or convert to an SVG
- Save in public/images
- Add details here how you created the image

svg files:

- mobrotation.svg was drawn using https://pixelied.com/editor/design/6428399563ff01432c82a888 with Ethan
  Strominger's gmail account, then coverted to svg using https://cloudconvert.com/. If you want
  to modify an image using the same tool and source you would need to ask Ethan. It is not exportable.

### Modifying the Icon

The icon file is stored at public/favicon.ico. To modify this file

- Create an image using your favorite drawing tool
- Save or convert to favicon.ico icon file
- Add details here how you created the icon

The current version of favicon.ico was created using https://pixelied.com/editor/design/6428399563ff01432c82a888 with Ethan Strominger's gmail account, then coverted to svg using https://cloudconvert.com/. If you want to modify an image using the same tool and source you would need to ask Ethan. It is not exportable.

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

When you need to refresh node_modules in frontend or backend, run ./scripts/clean-all.sh

- clean-all.sh must be run. Removes the dist and node_module directories, and reruns yarn.

# Production Deployment

## One-time setup

### VSCode extension

See [CONTRIBUTING.md](./mobtimer-vscode/CONTRIBUTING.md)

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

- After running the script, there will be changes to package.json and yarn.lock files. Commit and push these changes.

- Push to main branch
