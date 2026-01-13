FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json ./
RUN yarn install --production
CMD ["yarn", "start"]
