## Initial Setup

From the Terminal:
```
git clone [this repository name here]
cd [this repository name here]
yarn
yarn global add ts-node
yarn global add heroku
heroku login
git remote add heroku https://git.heroku.com/mobtimer1234.git 
```

## View the Deployed App in a Web Browser
https://mobtimer1234.herokuapp.com/ 

## Deploy
```
git push heroku main
```

## Test
```
yarn test
```