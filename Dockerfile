FROM node:alpine

ARG PORT

WORKDIR /app

COPY ./ ./

RUN npm install

EXPOSE $PORT

CMD [ "npm","run","dev" ]
 