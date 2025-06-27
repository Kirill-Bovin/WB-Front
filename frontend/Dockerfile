FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN rm -rf node_modules package-lock.json && \
    npm install --legacy-peer-deps

RUN npm run build
