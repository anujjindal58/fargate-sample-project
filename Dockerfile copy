FROM --platform=linux/amd64 node:17.6.0-alpine3.15

WORKDIR /app
COPY src/ .
COPY package.json .
COPY package-lock.json .
Run npm install

CMD ["node", "index.js"]