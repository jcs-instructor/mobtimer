echo ***************************
cd mobtimer-api
yarn
yarn build
cd ../mobtimer-frontend
yarn
rm -rf node_modules/mobtimer-api
cp -rf ../mobtimer-api/dist/*.* node_modules/mobtimer-api/*.*
yarn build
ls node_modules/mobtimer-api
ls ../mobtimer-api/dist
read -p "Press any key to resume ..."
yarn start