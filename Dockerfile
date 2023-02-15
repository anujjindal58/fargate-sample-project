FROM node:17.6.0-alpine3.15

WORKDIR /app
COPY src/index.js .

CMD ["node", "index.js"]