FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/workers/face-worker/package.json ./apps/workers/face-worker/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

COPY apps/workers/face-worker ./apps/workers/face-worker
RUN pnpm --filter @everything/face-worker build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/workers/face-worker/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]

