FROM mhart/alpine-node:10

RUN apk add git

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

EXPOSE 3000
ENTRYPOINT yarn start
