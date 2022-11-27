FROM node:latest

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install

COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

