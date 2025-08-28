# ---------- Build stage ----------
FROM node:20-alpine AS build

# pnpm 활성화
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# lockfile 기반 의존성 설치 (캐시 최적화)
COPY frontend/package.json frontend/pnpm-lock.yaml frontend/pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# 소스 복사 및 빌드
COPY frontend/. .
RUN pnpm build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine

# 기본 html 삭제 후 새 빌드 결과 복사
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# 커스텀 nginx.conf 있으면 반영
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
