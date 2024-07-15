#!/bin/bash

# Wait for API to be healthy
until curl -s http://localhost:3000/healthy > /dev/null; do
  echo "Waiting for API to be healthy..."
  sleep 5
done

# Wait for UI to be healthy
until curl -s http://localhost:3600/healthy > /dev/null; do
  echo "Waiting for UI to be healthy..."
  sleep 5
done

# Navigate to ffc-sfd-experiment-ui directory and run npm build
cd ../.. || exit
echo "Running npm build..."
npm run build

# Navigate back to the acceptance test directory
cd test/acceptance || exit

# Run the acceptance tests
export HEADLESS=true
npm run test
