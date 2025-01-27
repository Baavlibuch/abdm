# Using official Node.js v16 image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8080

# Command to run the app
CMD ["node", "app.js"]