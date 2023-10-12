FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /repo

COPY package.json ./
COPY pnpm*.yaml ./
COPY apps /repo/apps

# Base dependencies installation
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --ignore-scripts --prod --frozen-lockfile

# feedback-server-app
FROM base AS feedback-server-app
COPY --from=prod-deps /repo/node_modules/ /repo/node_modules
COPY --from=prod-deps /repo/apps/feedback-server/node_modules/ /repo/apps/feedback-server/node_modules
WORKDIR /repo/apps/feedback-server
EXPOSE 3001
CMD [ "pnpm", "start" ]