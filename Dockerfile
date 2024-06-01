# Use an official Node.js runtime as a parent image
FROM node:20 as builder
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .
 
# Build the frontend application
RUN npm run build
 
# Expose the port the app runs on
EXPOSE 8087

# Define the command to run the app
CMD ["npm", "run", "dev"]
 
