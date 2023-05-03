FROM node:lts as dependencies
WORKDIR /new-ema-centers-app
COPY package.json ./
RUN npm install --legacy-peer-deps

FROM node:lts as builder
WORKDIR /new-ema-centers-app
COPY . .
COPY --from=dependencies /new-ema-centers-app/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /new-ema-centers-app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /new-ema-centers-app/next.config.js ./
COPY --from=builder /new-ema-centers-app/public ./public
COPY --from=builder /new-ema-centers-app/.next ./.next
COPY --from=builder /new-ema-centers-app/node_modules ./node_modules
COPY --from=builder /new-ema-centers-app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
