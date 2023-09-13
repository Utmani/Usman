# Use a base image with Node.js
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY /package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the backend code
COPY . . 
# Expose the port that your backend app will listen on
EXPOSE 3002

# Command to start the backend app
CMD ["node", "index.js"]
