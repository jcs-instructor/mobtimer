echo mobtimer-api dist  
echo .
ls -ltr mobtimer-api/dist/ | tail -n 3
echo .
echo frontend
echo .
ls -ltr mobtimer-frontend/node_modules/mobtimer-api/ | tail -n 3
ls -ltr mobtimer-frontend/node_modules/mobtimer-api/package.json
echo .
echo backend
echo .
ls -ltr mobtimer-backend/node_modules/mobtimer-api/ | tail -n 3
ls -ltr mobtimer-backend/node_modules/mobtimer-api/package.json