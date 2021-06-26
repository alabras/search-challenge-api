FROM node:lts-alpine as Build
WORKDIR /usr/search-challenge-api
COPY package*.json ./
RUN npm install ci --production

FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/search-challenge-api
COPY --chown=node:node --from=build /usr/search-challenge-api/node_modules ./node_modules
COPY --chown=node:node /build ./
EXPOSE 5000
CMD ["dumb-init","node","app.js"]
