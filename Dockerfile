# Use an official Node runtime as a parent image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /react

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN yarn install

# Build the React app
RUN yarn run build