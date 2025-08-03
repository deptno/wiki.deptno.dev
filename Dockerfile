FROM node:22-bullseye-slim

ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates && rm -rf /var/lib/apt/lists/*
RUN git config --global core.quotepath false
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/parser-vimwiki/package.json ./packages/parser-vimwiki/package.json
COPY ./packages/tsconfig/package.json ./packages/tsconfig/package.json

COPY ./apps/meilisearch-updater/package.json ./apps/meilisearch-updater/package.json
COPY ./apps/wiki/package.json ./apps/wiki/package.json

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

COPY . .

CMD ["sh", "-c", "pnpm turbo build && pnpm start"]
