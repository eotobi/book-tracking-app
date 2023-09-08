# Use the official Node.js LTS image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN yarn install

# Copy the entire frontend directory into the container
COPY . .

# Expose the port that your Next.js app is running on
EXPOSE 3000

# Start the Next.js development server
CMD ["yarn", "run", "dev"]
