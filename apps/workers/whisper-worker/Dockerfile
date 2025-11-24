FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/workers/whisper-worker/package.json ./apps/workers/whisper-worker/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

COPY apps/workers/whisper-worker ./apps/workers/whisper-worker
RUN pnpm --filter @everything/whisper-worker build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/workers/whisper-worker/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]

