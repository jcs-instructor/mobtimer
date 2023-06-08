set -v
date
export dir=$1
echo "Linking mobtimer-api $dir"
echo debug 1
rm -rf $dir/node_modules/mobtimer-api
echo debug 1a
ln -s $PWD/mobtimer-api/dist $dir/node_modules/mobtimer-api
echo debug 2
rm $dir/node_modules/mobtimer-api/package.json
ln -s $PWD/mobtimer-api/package.json $dir/node_modules/mobtimer-api/package.json
echo debug 3
Date > $dir/src/Date.txt # todo: Get this line to work on GitPod (Date.txt)