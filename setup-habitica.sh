#!/bin/bash
# This should be run in the directory where the habitica-detail directory exists (i.e. where we run git clone <habitica>)
set -e
MONGO_PID=""
NPM_START_PID=""

killNpmRunStart() {
  (
    set +e
    pkill -f 'nodemon'
    pkill -f "website/server/index"
    kill "$NPM_START_PID"
    set -e
  )
}

killAllNodeProcesses() {
  (
    set +e
    pkill -f 'node'
    pkill -f 'npm'
    set -e
  )
}

cleanup() {
  (
    set +e 
    echo "Running cleanup"
    killNpmRunStart
    echo "Deleting temp logs in ./tmplogs"
    rm -rf ./tmplogs
    echo "Finished cleanup"
    set -e
  )
}

trap cleanup EXIT SIGINT SIGTERM
# Get the current working directory
current_dir=$(pwd)

# Check if the current directory ends with 'habitica-detail'
if [[ "$current_dir" != *"/habitica-detail" ]]; then
    # If not, try to change to the 'habitica-detail' directory
    if [ -d "habitica-detail" ]; then
        cd habitica-detail
        echo "Changed to habitica-detail directory."
    else
        echo "habitica-detail directory not found in the current location."
        exit 1
    fi
else
    echo "Already in habitica-detail directory."
fi

echo "Beginning setup of config.json"
# Creates config.json object and udpates the NODE+TEST_DB_URI to use 127.0.0.1 instead of localhost
cp ./config.json.example ./config.json
sed -i.bak 's/"NODE_DB_URI": "mongodb:\/\/localhost:/"NODE_DB_URI": "mongodb:\/\/127.0.0.1:/g' config.json && rm config.json.bak
sed -i.bak 's/"TEST_DB_URI": "mongodb:\/\/localhost:/"TEST_DB_URI": "mongodb:\/\/127.0.0.1:/g' config.json && rm config.json.bak
echo "Ending setup of config.json"
# Do global installs

echo "Beginning install of habitica dependencies"
npm install
echo "Successfully installed habitica dependencies"
echo "Beginning install of detail dependencies"
# If setting up habitica locally, use the link instead of package dependencies. Make sure to run `make link` on detail repo first
if [ "$LOCAL_DEV" = true ]; then
  npm link @detail-dev/trace @detail-dev/shared @detail-dev/replay
else
  # :KLUDGE: habitica by default is on redis3 & we bumped on our dev branch to 4. eval set data works w/ redis4
  # adding this as a safeguard in case we run on a new base that's using redis3
  npm install redis@4.6.7
  npm install @detail-dev/trace@latest
  npm install --save-dev @detail-dev/replay@latest
fi
echo "Completed install of detail dependencies"

mkdir -p tmplogs

# Start mongodb and keep around as background process
npm run mongo:dev:detail > ./tmplogs/mongo.log 2>&1 & MONGO_PID=$!

echo "Waiting for MongoDB to start..."
echo $MONGO_PID
while ! grep -q "Started replica set on" ./tmplogs/mongo.log; do
    if ! kill -0 $MONGO_PID 2>/dev/null; then
        echo "MongoDB process has died. Here are the contents of ./tmplogs/mongo.log:"
        echo "----------------------------------------"
        cat ./tmplogs/mongo.log
        echo "----------------------------------------"
        echo "MongoDB process failed to start. Check the log output above for errors."
        kill $MONGO_PID
        exit 1
    fi
    sleep 2
done
echo "MongoDB is ready."

# Start habitica server w/o detail tracing
echo "Waiting for npm run start to complete..."
npm run start > ./tmplogs/npmstart_1.log 2>&1 & NPM_START_PID=$!

# Wait for npm run start to finish
echo $NPM_START_PID
while ! grep -q "Connected with Mongoose" ./tmplogs/npmstart_1.log; do
    if ! kill -0 $NPM_START_PID 2>/dev/null; then
        echo "Habitica server process has died. Check ./tmplogs/npmstart_1.log for errors."
        echo "----------------------------------------"
        cat ./tmplogs/npmstart_1.log
        echo "----------------------------------------"
        kill $NPM_START_PID
        exit 1
    fi
    sleep 2
done
# Wait to make sure server is fully spun up
sleep 5
echo "Setup Habitica server w/o tracing"

# Call the seed command to create a user context.
./seed.bash > ./tmplogs/seed.log 2>&1
# Wait 15s to make sure that all requests go through
sleep 15

echo "Seed complete."
# set values from seed for usage on load
while IFS='=' read -r key value
do
    value=$(echo "$value" | xargs)
    case "$key" in
        USER1_ID) SEED_USER1_ID=$value ;;
        USER1_API_TOKEN) SEED_USER1_API_TOKEN=$value ;;
        CLIENT) SEED_CLIENT=$value ;;
        CHAT1_UUID) SEED_CHAT1_UUID=$value ;;
        GROUP1_ID) SEED_GROUP1_ID=$value ;;
        CHALLENGE1_ID) SEED_CHALLENGE1_ID=$value ;;
    esac
done < <(grep -E "^(USER1_ID|USER1_API_TOKEN|CLIENT|CHAT1_UUID|GROUP1_ID|CHALLENGE1_ID)=" ./tmplogs/seed.log)

echo "SEED_USER1_ID: $SEED_USER1_ID"
echo "SEED_USER1_API_TOKEN: $SEED_USER1_API_TOKEN"
echo "SEED_CLIENT: $SEED_CLIENT"
echo "SEED_CHAT1_UUID: $SEED_CHAT1_UUID"
echo "SEED_GROUP1_ID: $SEED_GROUP1_ID"
echo "SEED_CHALLENGE1_ID: $SEED_CHALLENGE1_ID"

if [ -z "$SEED_USER1_ID" ] || [ -z "$SEED_USER1_API_TOKEN" ] || [ -z "$SEED_CLIENT" ] ||
   [ -z "$SEED_CHAT1_UUID" ] || [ -z "$SEED_GROUP1_ID" ] || [ -z "$SEED_CHALLENGE1_ID" ]; then
    echo "Error: seed values are missing. Exiting."
    exit 1
fi

killNpmRunStart
echo "Killed Habitica server w/o detail tracing"

# Start habitica server w/ detail tracing
echo "Waiting for DETAIL_TRACE=true npm run start to complete..."
DETAIL_TRACE=true npm run start > ./tmplogs/npmstart_2.log 2>&1 & NPM_START_PID=$!

echo $NPM_START_PID
while ! grep -q "Connected with Mongoose" ./tmplogs/npmstart_2.log; do
    if ! kill -0 $NPM_START_PID 2>/dev/null; then
        echo "Habitica server process has died. Check ./tmplogs/npmstart_2.log for errors."
        kill $NPM_START_PID
        exit 1
    fi
    sleep 1
done
sleep 5
echo "Habitica server is ready."

# Loads habitica with data for tracing
./load.bash --user_id="$SEED_USER1_ID" --api_token="$SEED_USER1_API_TOKEN" --group_id="$SEED_GROUP1_ID" --challenge_id="$SEED_CHALLENGE1_ID"  \
  > ./tmplogs/load.log 2>&1

# We wait 15s to make sure all requests have gone through.
sleep 15
echo "Load complete."


# Kill habitica w/ tracing process
killNpmRunStart
echo "Starting generation"
# Generate detail replay tests
make generate
# At this point in time, the habitica generate eval set only references 2 replay tests. Generating coverage reports for each replay tests takes a significant amount of time.
# If we prune the unused replay tests here, devbox initialization speeds up significantly.
echo "Finished generating"
make prune-replay
echo "Finished pruning replay tests"
make replay-cov
echo "Setup script completed"

### THIS IS TEMPORARY
sleep 200