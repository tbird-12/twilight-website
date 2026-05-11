# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24.15.0

FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /workspaces/twilight-website

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS dev
EXPOSE 4321
CMD ["sh", "-c", "npm ci && npm run dev -- --host 0.0.0.0"]

FROM nginx:1.29-alpine AS production
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspaces/twilight-website/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
