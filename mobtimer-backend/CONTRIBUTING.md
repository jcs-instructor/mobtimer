## Initial Setup

From the Terminal:

```
git clone [this repository name here]
cd mobtimer-api
yarn
yarn build
yarn link
cd [this repository name here]
yarn
yarn link mobtimer-api
yarn global add ts-node
yarn global add heroku
yarn global add nodemon
heroku login
git remote add heroku https://git.heroku.com/mobtimer1234.git
```

## View the Deployed App in a Web Browser

https://mobtimer1234.herokuapp.com/

## Deploy

```
git push heroku main
```

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
