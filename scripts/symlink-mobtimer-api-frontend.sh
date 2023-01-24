date
echo "Linking mobtimer-api frontend"
rm -rf mobtimer-frontend/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-frontend/node_modules/mobtimer-api
rm -rf mobtimer-frontend/node_modules/mobtimer-api/package.json
ln -s $PWD/mobtimer-api/package.json mobtimer-frontend/node_modules/mobtimer-api/package.json
