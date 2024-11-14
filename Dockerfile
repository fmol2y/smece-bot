FROM node:20-alpine3.20

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "dist/index.js"]