# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install curl to check the /healthy endpoint
RUN apt-get update && apt-get install -y curl

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install app dependencies
RUN npm install

# Make the acceptance test script executable
RUN chmod +x ./start-tests.sh

# Command to run the acceptance tests
CMD ["./start-tests.sh"]
