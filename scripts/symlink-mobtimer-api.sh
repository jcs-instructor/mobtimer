date
export dir=$1
echo "Linking mobtimer-api $dir"
rm -rf $dir/node_modules/mobtimer-api
ln -s $PWD/mobtimer-api/dist $dir/node_modules/mobtimer-api
rm $dir/node_modules/mobtimer-api/package.json
ln -s $PWD/mobtimer-api/package.json $dir/node_modules/mobtimer-api/package.json
Date > $dir/src/Date.txt # todo: Get this line to work on GitPod (Date.txt)