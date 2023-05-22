cd mobtimer-api
rm -rf dist
rm -rf node_modules
yarn
../scripts/generate-mobtimer-api-exports-no-watch.sh
cd ..
./scripts/compile-mobtimer-api-no-watch.sh
ls ./mobtimer-api/dist
cd ./mobtimer-frontend
rm -rf node_modules/mobtimer-api
mkdir node_modules/mobtimer-api
cp ../mobtimer-api/package.json node_modules/mobtimer-api/package.json
cp ../mobtimer-api/yarn.lock node_modules/mobtimer-api/yarn.lock
echo aaaa
cp ../mobtimer-api/dist/*.* node_modules/mobtimer-api
echo xxxx
ls node_modules/mobtimer-api
echo zzzz
ls ../mobtimer-api/dist
yarn start

