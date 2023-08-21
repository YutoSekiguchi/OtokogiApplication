FROM node:18.9

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

COPY .next .next

EXPOSE 3000

CMD [ "yarn", "start" ]