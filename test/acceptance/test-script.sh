#!/bin/bash

# Wait for the API service to be healthy
echo "Waiting for the API service to be healthy..."

# Hit the /healthy endpoint
curl http://api:3000/healthy

# Capture the response
response=$(curl -s -o /dev/null -w "%{http_code}" http://api:3000/healthy)

# Check if the response is 200
if [ "$response" -eq 200 ]; then
  echo "API is healthy."
  exit 0
else
  echo "API is not healthy. Response code: $response"
  exit 1
fi
