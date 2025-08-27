# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# pnpm 활성화
RUN corepack enable && corepack prepare pnpm@latest --activate

# 캐시 최적화
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch

# 소스 복사 후 오프라인 설치 + 빌드
COPY . .
RUN pnpm install --offline --frozen-lockfile
RUN pnpm build   # (= pnpm run build)

# ---------- Runtime stage ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 경량 정적 서버 설치
RUN npm i -g serve

# 빌드 산출물만 복사
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
