date
echo "Linking mobtimer-api"
./scripts/generate-mobtimer-api-exports-no-watch.sh
./scripts/symlink-mobtimer-api-backend.sh
./scripts/symlink-mobtimer-api-vscode.sh
