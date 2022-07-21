FROM node:16-alpine as development

WORKDIR /usr/src/disc-bot/

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/disc-bot/

COPY package*.json ./

RUN npm install pm2 -g
RUN npm ci --omit=dev

COPY --from=development /usr/src/disc-bot/dist ./dist

CMD ["node", "-r", "ts-node/register/transpile-only", "-r", "tsconfig-paths/register", "dist/server.js"]
