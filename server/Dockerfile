FROM node:lts

ENV NODE_ENV production

WORKDIR /usr/src/app

# Descargamos el script wait-for-it.sh
RUN curl -LJO https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/src/app/wait-for-it.sh

COPY public /usr/src/app/public/
COPY src /usr/src/app/src/
COPY package.json /usr/src/app/

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "src/server.js"]