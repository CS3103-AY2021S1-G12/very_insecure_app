FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY ./src ./src
COPY server.mjs .

RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]
