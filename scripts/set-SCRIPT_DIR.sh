echo 1 $1
SCRIPT_NAME=$1
(return 0 2>/dev/null) && sourced="true" || sourced="false"
if [ "$sourced" != "true" ]; then
    echo "Error, script not sourced.  Please run 'source ./activate.sh'"
    exit 1
fi

echo name $SCRIPT_NAME
SCRIPT_DIR="$( cd "$( dirname "${SCRIPT_NAME}" )" &> /dev/null && pwd )"
export WORKSPACE_FOLDER=$SCRIPT_DIR
echo "Script directory: $SCRIPT_DIR"