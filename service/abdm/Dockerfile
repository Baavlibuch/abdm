# Usinf official Node.js v16 image
FROM node:16

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Add build env for credentials
ENV ABDM_SBX_CLIENT_ID=""
ENV ABDM_SBX_CLIENT_SECRET=""

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8080

# Command to run the app
CMD ["node", "app.js"]