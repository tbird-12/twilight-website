# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24.15.0
ARG NPM_VERSION=11.12.1

FROM node:${NODE_VERSION}-bookworm-slim AS base
ARG NPM_VERSION
WORKDIR /workspaces/twilight-website
RUN npm install -g npm@${NPM_VERSION}

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS dev
RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 4321
CMD ["sh", "-c", "npm ci && npm run dev -- --host 0.0.0.0"]

FROM nginx:1.29-alpine AS production
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspaces/twilight-website/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
