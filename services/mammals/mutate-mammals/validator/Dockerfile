FROM node:12.22-alpine

WORKDIR /usr/app

COPY package.json .

# RUN npm i --quiet
RUN npm install

RUN npm install pm2 -g

COPY . .

CMD ["pm2-runtime", "index.js"]