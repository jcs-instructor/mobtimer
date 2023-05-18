date
echo "Linking mobtimer-api vscode"
rm -rf mobtimer-vscode/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-vscode/node_modules/mobtimer-api
rm -rf mobtimer-vscode/node_modules/mobtimer-api/package.json
ln -s $PWD/mobtimer-api/package.json mobtimer-vscode/node_modules/mobtimer-api/package.json
Date > mobtimer-vscode/src/Date.txt # todo: Get this line to work on GitPod (Date.txt)
