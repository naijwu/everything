FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/workers/caption-worker/package.json ./apps/workers/caption-worker/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

COPY apps/workers/caption-worker ./apps/workers/caption-worker
RUN pnpm --filter @everything/caption-worker build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/workers/caption-worker/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]

