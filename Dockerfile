FROM node:16-alpine AS devrunner
RUN apk add --no-cache bash
WORKDIR /app
COPY --chown=node:node package.json yarn.lock tsconfig.json index.ts ./
COPY --chown=node:node src/ ./src
COPY --chown=node:node prisma/ ./prisma
COPY --chown=node:node dist/ ./dist
RUN yarn install --frozen-lockfile
RUN chown -R node:node /app
USER node

CMD ["yarn", "start:dev"]
