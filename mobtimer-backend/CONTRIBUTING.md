## Initial Setup

From the Terminal:

```
cd [this repository name here]
yarn
yarn link mobtimer-api
yarn global add ts-node
# yarn global add heroku
yarn global add nodemon
```

## Heroku instructions (obsolete?)

### Heroku Setup

```
heroku login
git remote add heroku https://git.heroku.com/mobtimer1234.git
```

### Deploy

```
git push heroku main
```

### View the Deployed Heroku App in a Web Browser

https://mobtimer1234.herokuapp.com/

## Run Unit Tests

```
yarn test
```

## Manually Test

Sample message to send via Postman:

```
{ "action": "join", "mobName": "amazing-folks" }
```

## Start Backend Server

If running from a single repository, see CONTRIBUTING.md in the top level directory to start all components (frontend server, backend server, and api build)

To start the Backend Server only, from the Terminal:

```
cd mobtimer-backend
./start.sh
```

## Refresh node_modules, rerun yarn

For some issues, you may want to delete node_modules and run yarn again. After yarn is done, you will need to relink the mobtimer-api directory. Follow these directions to do both steps:

```
../scripts/clean.sh mobtimer-frontend
```

# Deployment

## One-time setup:
- On render.com, create web service
    - Name: mobtimer-backend
    - Root Directory: mobtimer-backend
    - Build Command: yarn; yarn build
    - Click "Create Web Service" button at bottom to save
    - Copy link to web service (at top left corner of page)
- In the mobtimer repo, go to Settings, then Environments; select github-pages, and add an Environment Variable (at bottom):
    - Name: REACT_WEBSOCKET_URL
    - Value: <paste url from the render web service above> (e.g., https://mobtimer-backend-pj2v.onrender.com)
- Test using Postman app
    - todo:
    ```
    ```