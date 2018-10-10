FROM mhart/alpine-node:10

RUN apk add git

WORKDIR /app
EXPOSE 3000

COPY package.json yarn.lock ./
RUN yarn install

ENTRYPOINT yarn start
