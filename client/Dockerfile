FROM node:14 AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN chown -R node /usr/src/app/node_modules

COPY . ./

USER node

EXPOSE 3000

CMD [ "npm", "start"]

FROM base AS builder

USER root

RUN npm run build

RUN chown -R node /usr/src/app/build

FROM nginx:1.21.4 AS production

COPY --from=builder /usr/src/app/build /usr/share/nginx/html 

