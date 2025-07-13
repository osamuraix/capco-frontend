# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with a production-ready NGINX server
FROM nginx:1.21-alpine

# Copy the static assets from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
