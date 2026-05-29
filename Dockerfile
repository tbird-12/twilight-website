# syntax=docker/dockerfile:1.7

ARG UBUNTU_VERSION=24.04
ARG NODE_VERSION=24.15.0
ARG NPM_VERSION=11.12.1

FROM ubuntu:${UBUNTU_VERSION} AS base
ARG NODE_VERSION
ARG NPM_VERSION
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /workspaces/twilight-website
RUN apt-get update \
    && apt-get install -y --no-install-recommends bash ca-certificates curl git xz-utils \
    && rm -rf /var/lib/apt/lists/*
RUN ARCH="$(dpkg --print-architecture)" \
    && case "${ARCH}" in \
      amd64) NODE_ARCH="x64" ;; \
      arm64) NODE_ARCH="arm64" ;; \
      *) echo "Unsupported architecture: ${ARCH}" >&2; exit 1 ;; \
    esac \
    && curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" -o /tmp/node.tar.xz \
    && tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1 --no-same-owner \
    && rm /tmp/node.tar.xz \
    && npm install -g "npm@${NPM_VERSION}"
SHELL ["/bin/bash", "-lc"]

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS dev
EXPOSE 4321
CMD ["bash", "-lc", "npm ci && npm run dev -- --host 0.0.0.0"]

FROM nginx:1.29-alpine AS production
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspaces/twilight-website/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
