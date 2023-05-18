date
echo "Linking mobtimer-api vscode-extension"
rm -rf mobtimer-vscode-extension/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist mobtimer-vscode-extension/node_modules/mobtimer-api
rm -rf mobtimer-vscode-extension/node_modules/mobtimer-api/package.json
ln -s $PWD/mobtimer-api/package.json mobtimer-vscode-extension/node_modules/mobtimer-api/package.json
