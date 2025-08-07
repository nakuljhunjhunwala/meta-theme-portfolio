# ---------- Base builder ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Install OS deps
RUN apk add --no-cache libc6-compat

# Install dependencies (respect package manager lockfile if present)
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./

# Default to npm if no other lockfile present
RUN if [ -f yarn.lock ]; then \
    corepack enable && corepack prepare yarn@stable --activate && yarn --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then \
    corepack enable && corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile; \
    else \
    npm ci; \
    fi

# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js (standalone output configured in next.config.mjs)
RUN if [ -f yarn.lock ]; then \
    corepack enable && corepack prepare yarn@stable --activate && yarn build; \
    elif [ -f pnpm-lock.yaml ]; then \
    corepack enable && corepack prepare pnpm@latest --activate && pnpm build; \
    else \
    npm run build; \
    fi

# ---------- Runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy standalone server and public assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

# Start Next.js server
CMD ["node", "server.js"]

