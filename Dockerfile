FROM node:18-bullseye
LABEL authors="deptno"

ENV NEXT_TELEMETRY_DISABLED 1
ARG TAG=latest

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN cd apps/wiki

WORKDIR /app/apps/wiki

CMD pnpm start
