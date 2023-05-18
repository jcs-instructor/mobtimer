./scripts/generate-mobtimer-api-exports-no-watch.sh
./scripts/symlink-mobtimer-api-frontend.sh
# cd mobtimer-api
# ./start-no-watch.sh
sleep 2 # to make sure other components are compiled first
cd ./mobtimer-frontend
./start.sh
