#!/bin/bash 

# monitor_changes
#
#     notifies changes to FILE passed as first parameter $1
#     uses tail -1 to return last line of the file

# first run -- save last line on variable old
old=$(ls -ltr1 src/*.ts | sort)

echo Watching for new files to generate d.ts

# infinite loop 
echo Monitoring
while : ; do
    sleep 1
    # read again last line
    new=$(ls -ltr1 src/*.ts  | sort) 

    # this is where the magic should happen
    [[ "$old" != "$new" ]] && ./generate-exports-no-watch.sh

    # save for next round
    old=$new
done
echo Done monitoring
