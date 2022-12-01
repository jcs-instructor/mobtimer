rm -rf mobtimer-frontend/node_modules/mobtimer-api
rm -rf mobtimer-frontend-hyperapp/node_modules/mobtimer-api
rm -rf mobtimer-backend/node_modules/mobtimer-api

ln -s $PWD/mobtimer-api/dist mobtimer-frontend/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-frontend-hyperapp/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-backend/node_modules/mobtimer-api
