rm package.json
rm yarn.lock
rm tsconfig.json
rm jest.config.js
ln -s mobtimer-backend/package.json .
ln -s mobtimer-backend/yarn.lock .
ln -s mobtimer-backend/tsconfig.json .
ln -s mobtimer-backend/jest.config.js .
