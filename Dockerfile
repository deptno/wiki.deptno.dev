FROM node:22-bullseye-slim

ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*
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

ARG NEXT_PUBLIC_ENDPOINT
ARG NEXT_PUBLIC_MEILISEARCH_HOST
ARG URL_ME
ARG DIR_WIKI_ROOT
ARG DIR_WIKI

ENV NEXT_PUBLIC_ENDPOINT=$NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_MEILISEARCH_HOST=$NEXT_PUBLIC_MEILISEARCH_HOST
ENV URL_ME=$URL_ME
ENV DIR_WIKI_ROOT=$DIR_WIKI_ROOT
ENV DIR_WIKI=$DIR_WIKI

RUN pnpm turbo build

CMD ["pnpm","start"]
