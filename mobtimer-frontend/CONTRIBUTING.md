## Initial Setup

From the Terminal:

```
git clone [this repository name here]
cd [this repository name here]
yarn
```

## Start Frontend Server

If running from a single repository, see CONTRIBUTING.md in the top level directory to start all components (frontend server, backend server, and api build)

To start the Frontend Server only, from the Terminal:

```
cd mobtimer-frontend
./start.sh
```

## Refresh node_modules, rerun yarn

For some issues, you may want to delete node_modules and run yarn again. After yarn is done, you will need to relink the mobtimer-api directory. Follow these directions to do both steps:

```
../scripts/clean.sh mobtimer-frontend
```

## GitHub Pages Deployment

## One-time setup:

- On render.com, create static website
  - Name: mobtimer-frontend
  - Root Directory: mobtimer-frontend
  - Build Command: yarn; yarn build
  - Click "Create Static Website" button at bottom to save
  - Click Environment and add variable:
    - Key: REACT_APP_WEBSOCKET_URL
    - Value: paste url from the backend web service and change https to wss (e.g., wss://mobtimer-backend-pj2v.onrender.com)
  - Click link at top left corner of page to view in web browser - note: it might take a few minutes to be available (e.g., https://mobtimer-frontend-iwa7.onrender.com)

### Subsequent deployments

- In the terminal, enter:
  ```
  cd mobtimer-frontend/
  npm run deploy
  ```
