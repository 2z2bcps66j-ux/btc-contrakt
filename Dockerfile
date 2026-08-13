# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g pm2

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/server ./src/server

# Expose ports
EXPOSE 5000 3000

# Start application
CMD ["pm2-runtime", "start", "dist/server/index.js", "--name", "btc-contrakt"]
