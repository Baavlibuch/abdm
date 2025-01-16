# Step 1: Build the frontend application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and build the app using Vite
COPY . ./
RUN npm run build

# Step 2: Set up the production environment
FROM node:18-alpine

# Install 'serve' to serve the build folder
RUN npm install -g serve

WORKDIR /app

# Copy the build directory (Vite uses 'dist' as the output folder)
COPY --from=build /app/dist /app/dist

# Set the port for the application
ENV PORT=8080

# Expose the application port
EXPOSE 8080

# Command to run the app using 'serve'
CMD ["serve", "-s", "dist", "-l", "8080"]
