#!/bin/bash

export BROWSER_NAME=${BROWSER_NAME:-chrome}
export TEST_SERVER_PORT=${TEST_SERVER_PORT:-3333}

./node_modules/.bin/http-server -p $TEST_SERVER_PORT --silent &
PID=$!

node test/integration/runner
TEST_RUNNER_EXIT=$?
kill $PID

if [ $TEST_RUNNER_EXIT == "0" ]; then
    exit 0
else
    exit 1
fi
