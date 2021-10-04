FROM node:16 AS build

# Install dependencies
WORKDIR /build
COPY package*.json ./
RUN yarn

# Build
COPY . ./
RUN yarn build

# Deployment
FROM nginx AS deploy

COPY --chown=www-data:www-data --from=0 /build/dist /usr/share/nginx/html