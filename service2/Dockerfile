# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Expose the port that Node.js will listen on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]