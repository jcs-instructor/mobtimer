date
echo "Linking mobtimer-api"
./scripts/generate-mobtimer-api-exports-no-watch.sh
./scripts/symlink-mobtimer-api-frontend.sh
./scripts/symlink-mobtimer-api-backend.sh
