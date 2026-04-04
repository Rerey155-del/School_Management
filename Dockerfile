FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files to container
COPY . .

# Expose port for Vite
EXPOSE 5173

# Run Vite development server with --host to expose it outside the container
CMD ["npm", "run", "dev", "--", "--host"]
