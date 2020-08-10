FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build

ENV NODE_ENV docker

EXPOSE 3000 9229

CMD [ "npm", "run", "start" ]