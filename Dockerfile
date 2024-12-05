FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20 AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

COPY package.json yarn.lock ./

ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/main"]
