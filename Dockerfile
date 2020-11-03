FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY ./src .
COPY server.js .
ENTRYPOINT [ "node", "server.js" ]
