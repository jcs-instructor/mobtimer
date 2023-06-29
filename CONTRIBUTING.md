# Development

## Windows PC Setup

In VS Code, set your default terminal to Git Bash as follows (needed for some tasks to work on PC):

- Press CTRL + SHIFT + P to open the Command Palette.
- Search for “Terminal: Select Default Profile” (previously “Terminal: Select Default Shell”)
- Select “Git Bash”

## Initial Setup

1. Clone and install global yarn packages:

  From the Terminal:
  ```
  git clone [this repository name here]
  cd [this repository name here]
  yarn global add nodemon
  yarn global add ts-node
  yarn global add @vscode/vsce
  ```
  
2. Create a .env file in mobtimer-vscode:
   
   From the Terminal:
   ```
   cd mobtimer-vscode
   cp .env.EXAMPLE .env
   ```

3. Examine values in .env, especially REACT_APP_DEPLOYED_WEBSOCKET_URL. Set the value to the url you are using for deploying on the web (e.g., ws://mobtimer-backend-pj2v.onrender.com). This is required to be set when you install the extension in vscode. If you haven't deployed yet, then set this when you do deploy.  REACT_APP_LOCAL_WEBSOCKET_URL, which 
is used when running extension in debug mode, is set to ws://localhost:3000
    
4. Optionally, create a .env file for mobtimer-frontend.  If you don't, REACT_APP_LOCAL_WEBSOCKET_URL will default
to ws://localhost:3000.  REACT_APP_DEPLOYED_WEBSOCKET_URL is not used when running the REACT app locally.

   From the Terminal (optional):
   ```
   cd mobtimer-frontend
   cp .env.EXAMPLE .env
   ```

5. Run "mobtimer all steps"

  In VSCode:

  - Press CTRL + SHIFT + P to open the Command Palette
  - Search for "Tasks: Run Task"
  - Run "mobtimer all steps".  Note: If compile errors and not obvious how to fix it 
  sometimes re-running "mobtimer all tasks" or applicable steps for the component will work.


## Start All Components

To start all components (frontend server, backend server, and api build):

In VS Code,

- Press CTRL + SHIFT + P to open the Command Palette
- Search for "Tasks: Run Task"
- Run task "mobtimer step 3 - start watch" 
  - if get compilation or runtime errors, consider running task "mobtimer all steps" or re-running the failed tasks (may need to run mobtimer all steps
      twice if get errors the first time)
- To install latest VSCode extension into vscode, see [here](#Building-and-Installing-VSCode-Extension)

## Making Code Changes

- Change code as desired 
- Mobtimer Frontend and Backend will automatically restart (because of the watchers).  VSCode Extension will automatically rebuild but not run a(see steps below for running with the new code)
- If you want to run the VSCode extension in Debug mode:
  - Press F5 (or Run > Start Debugging)
  - When prompted, select "mobtimer vscode compile no watch (for debugger)"
  - Once a new VSCode instance opens, enter the VSCode command (ctrl-shift-P in Windows): "Mobtimer for VSCode"
- To install and run latest VSCode extension into vscode, see [here](#Building-and-Installing-VSCode-Extension)
- Push to development branch
- If you want to deploy changes, see [subsequent deployments](#Subsequent-deployments)

### API changes

- Make changes to mobtimer-api. Any changes will be automatically picked up by the watcher tasks (running on localhost)
- Also if you are reinstalling the mobtimer-vscode extension or deploying mobtimer-frontend to the web, you will need to 
  publish the mobtimer-api to npmjs. See [step 1 of subsequent deployments](#Subsequent-deployments)

### Adding a New Feature

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

## Building and Installing VSCode Extension
1. Delete old *.vsix files from mobtimer-vscode directory (if exist)
```
cd mobtimer-vscode
ls *.vsix
rm *.vsix
```
2. Re-publish mobtimer-api if npmjs version is outdated.  See [step 1 of subsequent deployments](#Subsequent-deployments)
3. Uninstall old version of mobtimer-vscode
   - Select the extension in the VSCode Extensions window
   - Click on gear and select Uninstall
   - Refresh by doing one of the following: 
     - Click on the "Reload Required" button if it appears, or 
     - Click the refresh button at the very top of the list of Extensions in VSCode (in left panel)
4. Inspect value of REACT_APP_DEPLOYED_WEBSOCKET_URL in .env file located in the mobtimer-vscode directory.
This should point to the deployed version of the extension.
5. Optional: Increment version in the mobtimer-vscode/package.json by running `npm version`
6. From terminal: 
```
vsce package
```
7. To find out the name of the file produced by the previous step:
```
ls *.vsix
```

8. To install in your vscode, from terminal: 

```
     code --install-extension <file name>.vsix
```
9. See [reminders](reminders.md) **Start of session** for how to start VSCode
10. To install in vscode on other machines, copy the vsix file to a directory, and then follow instructions in the previous step.

## Publish extension

For information on how to publish an extension, see https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce.


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

### Frontend

- On render.com, create static website
  - Name: mobtimer-frontend
  - Root Directory: mobtimer-frontend
  - Build Command: yarn; yarn build
  - Click "Create Static Website" button at bottom to save
  - Click Environment and add variable:
    - Key: REACT_APP_DEPLOYED_WEBSOCKET_URL
    - Value: paste url from the backend web service and change https to ws (e.g., ws://mobtimer-backend-pj2v.onrender.com)
  - Click link at top left corner of page to view in web browser - note: it might take a few minutes to be available (e.g., https://mobtimer-frontend-iwa7.onrender.com)

### Backend

- On render.com, create web service
  - Name: mobtimer-backend
  - Root Directory: mobtimer-backend
  - Build Command: yarn; yarn build
  - Click "Create Web Service" button at bottom to save
  - Once complete, click on the link to the web service (at top left corner of the screen). Browser should open with message "http server started"
  - Copy link to web service (at top left corner of page, e.g., https://mobtimer-backend-pj2v.onrender.com/) for use when deploying frontend 
- (Optional) Test using Postman app - for more details see https://blog.postman.com/postman-supports-websocket-apis/
  - Click on My Workspace
  - Click on New
  - Click on Websocket Request
  - Paste previously copied link and change https to wss
  - Click Connect
  - Send the message "Test". A message something like {"actionInfo":{"action":"invalidRequestError"}} will be returned.

## Subsequent deployments
### Step 1 - Publish the API
If the published version of the MobTimer API is out of date, publish the API.

In the terminal
```
  cd mobtimer-api
  npm login # if not logged in already - follow prompts
  ./publish-no-watch.sh
```
- When prompted, authenticate with npmjs.com as instructed in terminal.
- After the script finishes running, there will be changes to package.json and yarn.lock files. Commit and push these changes.

### Step 2 - Push to main branch
- Push to main branch
- Check deployment dashboard (e.g., https://dashboard.render.com/) to see if deployment is successful (or still in progress or failed). Note: You might have to refresh the page after it completes to see the real "LAST DEPLOYED" time.
- Once deployment has finished successfully, click link to open deployed frontend in browser (it might take a few minutes to be available): https://mobtimer-frontend-iwa7.onrender.com
- To see any changes to the vscode extension in VSCode, see above section ["Building and Installing VSCode Extension"](#Building-and-Installing-VSCode-Extension)

## Troubleshooting
- If getting non-obvious compile errors:
  - Try re-running "Mobtimer Start All" task or individual related tasks.
  - Look at the dates when the applicable tasks (all of the dependent tasks in "Mobtimer Start All" task) were run 
    and see if they are in the correct order (i.e., the same order as in tasks.json). All jobs except "mobtimer frontend start watch" will display the date and time.  To see when mobtimer-frontend last started to compile, look at
    the console in the web browser with the mobtimer displayed.  The message will say something like 
    "App.tsx redeployed 3 on Thu Jun 29 2023 12:01:52 GMT-0400 (Eastern Daylight Time)"
- If it seems like the new code is doing nothing and you are not confident the new version has been included,
  you can either look at the dates as described above or you can modify the console.log statements and see if the
  console log output changes at runtime.
