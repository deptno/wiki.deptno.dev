FROM node:20-bullseye
LABEL authors="deptno"

ENV NEXT_TELEMETRY_DISABLED 1
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml node_modules ./
COPY turbo.json .nvmrc .npmrc ./
COPY apps packages ./

WORKDIR /app/apps/wiki

CMD pnpm start
