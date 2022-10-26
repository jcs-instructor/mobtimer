rm -rf mobtimer-frontend/node_modules/mobtimer-api
rm -rf mobtimer-backend/node_modules/mobtimer-api
rm -rf mobtimer-frontend/src/mobtimer-api
rm -rf mobtimer-backend/src/mobtimer-api

ln -s $PWD/mobtimer-api/dist mobtimer-frontend/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-backend/node_modules/mobtimer-api