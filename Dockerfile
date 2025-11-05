FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (only package*.json to take advantage of layer caching)
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy rest of the source and build
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
