# ── Stage 1: Install deps & run unit tests ──────────────────────────────────
FROM node:22-bookworm AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --no-fund --silent

COPY . .

# Type-check
RUN npx tsc --noEmit -p tsconfig.app.json

# Unit tests (Jest)
RUN npx jest --no-cache --ci --silent

# Production build
RUN npx ng build --configuration production

# ── Stage 2: Serve with nginx ────────────────────────────────────────────────
FROM nginx:stable-alpine AS production

COPY --from=builder /app/dist/portfolio-web-aronbo-ng/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
