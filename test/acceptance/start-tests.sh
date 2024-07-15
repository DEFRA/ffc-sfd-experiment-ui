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

# Run the acceptance tests
export HEADLESS=true
npm run test
