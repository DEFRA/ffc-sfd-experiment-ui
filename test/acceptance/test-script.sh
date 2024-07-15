#!/bin/bash

# Wait for the API service to be healthy
echo "Waiting for the API service to be healthy..."

# Hit the /healthy endpoint
curl http://localhost:3000/healthy

# Capture the response
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/healthy)

# Check if the response is 200
if [ "$response" -eq 200 ]; then
  echo "API is healthy."
else
  echo "API is not healthy. Response code: $response"
  exit 1
fi

# Wait for the UI service to be healthy (if healthcheck is configured)
echo "Waiting for the UI service to be healthy..."

# Hit the UI endpoint
ui_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3600/health)

# Check if the UI response is 200
if [ "$ui_response" -eq 200 ]; then
  echo "UI is healthy."
  exit 0
else
  echo "UI is not healthy. Response code: $ui_response"
  exit 1
fi
