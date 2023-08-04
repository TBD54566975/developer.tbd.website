FROM node:lts as base

WORKDIR /home/node/app
COPY --chown=node:node . /home/node/app/
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

FROM nginx:stable-alpine as deploy

COPY --chown=node:node --from=base /home/node/app/site/build /usr/share/nginx/html/
