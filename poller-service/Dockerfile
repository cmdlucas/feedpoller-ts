FROM node:12.18.1-alpine3.9 as development

WORKDIR /poller-service

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.18.1-alpine3.9 as production

ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

WORKDIR /poller-service

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /poller-service/dist ./dist

CMD ["npm", "run", "start:prod"]