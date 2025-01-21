# Using official Node.js v16 image
FROM node:16-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Add build arguments for credentials
# ARG ABDM_SBX_CLIENT_ID
# ARG ABDM_SBX_CLIENT_SECRET

# # Set environment variables
# ENV ABDM_SBX_CLIENT_ID=$ABDM_SBX_CLIENT_ID
# ENV ABDM_SBX_CLIENT_SECRET=$ABDM_SBX_CLIENT_SECRET

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8080

# Define runtime environment variables (secrets injected at runtime)
ENV NODE_ENV=production

# Command to run the app
CMD ["node", "app.js"]