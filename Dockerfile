FROM node:14

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g --force yarn && yarn install --production=false

COPY . .

RUN yarn build
