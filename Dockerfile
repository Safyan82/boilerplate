# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app directory to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port your app will run on (default is 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
