FROM node:18

WORKDIR /usr/local/app
USER root

COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN ["npm", "ci"]
RUN ["npm", "link"]
RUN ["npm", "run", "build:all"]

ENV NODE_ENV="production"
ENV API_GLOBAL_CACHE_TTL="60000"
ENV API_GLOBAL_THROTTLER_TTL="1"
ENV API_GLOBAL_THROTTLER_LIMIT="30"
ENV API_PORT="8081"
ENV UI_PORT="8080"
ENV DATABASE_URL=${DATABASE_URL}
