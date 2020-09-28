FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 6969
CMD [ "node", "bot.js" ]