date
echo "Linking mobtimer-api backend"
rm -rf mobtimer-backend/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-backend/node_modules/mobtimer-api
rm mobtimer-backend/node_modules/mobtimer-api/package.json
ln -s $PWD/mobtimer-api/package.json mobtimer-backend/node_modules/mobtimer-api/package.json
