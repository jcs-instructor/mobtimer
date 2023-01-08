destfile_ts=src/exports.ts
destfile_temp=src/exports.tmp
rm $destfile_temp
touch $destfile_temp
echo Generating exports
for file in src/*.ts; do
  if [[ "$file" == "src/index.ts" ]] || \
  [[ "$file" == "src/mobTimerRequests.ts" ]] || \
  [[ "$file" == "src/mobTimerResponse.ts" ]]|| \
  [[ "$file" == $destfile_ts ]]|| \
  [[ "$file" == $destfile_temp ]]; then
    continue
  fi
  filename=$(basename "$file" .ts)
  echo "export * from \"./${filename}\"" >> $destfile_temp
done
echo Old $destfile_ts file:
cat $destfile_ts
cmp $destfile_ts $destfile_temp > diff.txt
if [ -s diff.txt ]; then
  echo "Updating exports.ts"
  cp $destfile_temp $destfile_ts
else
  echo "No changes to exports.ts"
fi
echo New $destfile_ts file:
cat $destfile_ts
rm $destfile_temp
rm diff.txt
