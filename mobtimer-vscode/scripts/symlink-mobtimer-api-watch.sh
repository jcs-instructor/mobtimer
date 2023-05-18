#!/bin/bash 

# monitor_changes
#
#     notifies changes to FILE passed as first parameter $1
#     uses tail -1 to return last line of the file

# first run -- save last line on variable old
old=(ls -ltr mobtimer-api/dist)

echo Watching for changes to mobtimer-api/dist

# infinite loop 
while : ; do
    sleep 1
    # read again last line
    new=$(ls -ltr mobtimer-api/dist) 

    # this is where the magic should happen
    [[ "$old" != "$new" ]] && ./scripts/symlink-mobtimer-api-no-watch.sh

    # save for next round
    old=$new
done
