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
  - Once complete, click on the link to the web service (at top left corner of the screen). Browser should open with message "http server started"
  - Copy link to web service (at top left corner of page) for use when deploying frontend
- (Optional) Test using Postman app - for more details see https://blog.postman.com/postman-supports-websocket-apis/
  - Click on My Workspace
  - Click on New
  - Click on Websocket Request
  - Paste previously copied link and change https to wss
  - Click Connect
  - Send the message "Test". A message something like {"actionInfo":{"action":"invalidRequestError"}} will be returned.
