FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/scheduler/package.json ./apps/scheduler/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

COPY apps/scheduler ./apps/scheduler
RUN pnpm --filter @everything/scheduler build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/scheduler/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]

