FROM node:14-alpine as builder

ENV NODE_ENV production

WORKDIR /home/node

COPY ./packages/elearning-backend/ .

RUN yarn install && yarn run build


CMD ["node", "dist/main.js"]
