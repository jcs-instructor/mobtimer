date
destfile_ts=src/exports-auto-generated.ts
destfile_temp=src/exports-auto-genered.tmp
echo "// Autogenerated by generate-exports-no-watch.sh" > $destfile_temp
echo Checking $destfile_ts
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
cmp $destfile_ts $destfile_temp > diff.txt
if [ -s diff.txt ]; then
  echo "Updating $destfile_ts"
  cp $destfile_temp $destfile_ts
else
  echo "No changes to exports.ts"
fi
rm $destfile_temp
rm diff.txt
