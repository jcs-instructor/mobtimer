sleep 2
./scripts/generate-mobtimer-api-exports-no-watch.sh
./scripts/symlink-mobtimer-api-backend.sh
# cd ./mobtimer-api
# ./start-no-watch.sh
cd ./mobtimer-backend
./start.sh