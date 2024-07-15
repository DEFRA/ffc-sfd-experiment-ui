#!/bin/bash

# Wait for API to be healthy
until curl -s http://api:3000/healthy > /dev/null; do
  echo "Waiting for API to be healthy..."
  sleep 5
done

# Wait for UI to be healthy
until curl -s http://ui:3600/health > /dev/null; do
  echo "Waiting for UI to be healthy..."
  sleep 5
done

# Run the acceptance tests
npm run test
