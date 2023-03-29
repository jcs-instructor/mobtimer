./generate-exports-no-watch.sh
./compile-no-watch.sh
npm version patch
git add package.json
git commit -m "Publishing new version %s"
cp package.json dist
cp README.md dist
cp LICENSE dist
cp .npmrc dist
cd dist
npm publish --access public
cd ../../mobtimer-frontend
yarn add mobtimer-api
cd ../mobtimer-backend
yarn add mobtimer-api


