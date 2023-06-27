#!/bin/bash 

# monitor_changes
#
#     notifies changes to FILE passed as first parameter $1
#     uses tail -1 to return last line of the file

# first run -- save last line on variable old
old=$(ls -1 src/*.ts)

# infinite loop 
echo Monitoring for new or deleted mobtimer-api files
echo When file is added or removed, automated exports needs to be regenerated.
while : ; do
    sleep 1
    # read again last line
    new=$(ls -1 src/*.ts) 

    # this is where the magic should happen
    [[ "$old" != "$new" ]] && ./generate-exports-no-watch.sh

    # save for next round
    old=$new
done
echo Done monitoring
