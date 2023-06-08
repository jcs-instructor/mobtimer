echo "Cleaning $1"
currentdir=$PWD
cd $1
rm -rf dist
rm -rf node_modules
rm -rf yarn.lock
yarn
cd $currentdir
ls
ls scripts
./scripts/api-setup.sh