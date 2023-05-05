date
echo "Linking mobtimer-api backend"
rm -rf mobtimer-backend/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-backend/node_modules/mobtimer-api
rm -rf mobtimer-backend/node_modules/mobtimer-api/package.json
ln -s $PWD/mobtimer-api/package.json mobtimer-backend/node_modules/mobtimer-api/package.json
Date > mobtimer-backend/src/Date.txt # todo: Get this line to work on GitPod (Date.txt)