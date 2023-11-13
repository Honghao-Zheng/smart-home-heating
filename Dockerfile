FROM node:20.9.0-alpine

COPY ./app.js ./app.js
COPY ./listen.js ./listen.js
COPY ./heating-router.js ./heating-router.js
COPY package.json package-lock.json ./
RUN npm install --production

EXPOSE 3000

ENTRYPOINT ["node", "listen.js"]
