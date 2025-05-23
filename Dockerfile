
# Base image
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Make sure we have a correct doctype in index.html (failsafe)
RUN if [ -f /usr/share/nginx/html/index.html ]; then \
    sed -i '1s/^/<!DOCTYPE html>\n/' /usr/share/nginx/html/index.html; \
    fi

# Create a healthcheck file
RUN echo "healthy" > /usr/share/nginx/html/health.txt

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
