echo ***************************
cd ../mobtimer-api
yarn
yarn build
cd ../mobtimer-frontend
yarn
ls node_modules/mobtimer-api
echo step 1
rm -rf node_modules/mobtimer-api
cp ../mobtimer-api/dist/*.* node_modules/mobtimer-api/*.*
ls node_modules/mobtimer-api
ls ../mobtimer-api/dist
yarn build
yarn start
