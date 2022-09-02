FROM node:16.16.0-slim as build

WORKDIR /app

COPY package*.json ./

RUN npm install --save --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:latest

VOLUME /var/cache/nginx

COPY --from=build app/dist/mini-netflix /usr/share/nginx/html

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
