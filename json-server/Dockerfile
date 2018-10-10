FROM mhart/alpine-node:10

RUN apk add curl

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

EXPOSE 3000
ENTRYPOINT yarn start --host 0.0.0.0 --port 3000
