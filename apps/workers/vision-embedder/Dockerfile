FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/workers/vision-embedder/package.json ./apps/workers/vision-embedder/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

COPY apps/workers/vision-embedder ./apps/workers/vision-embedder
RUN pnpm --filter @everything/vision-embedder build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/workers/vision-embedder/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]

