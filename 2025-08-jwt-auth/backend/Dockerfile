# ---------- Build Stage ----------
FROM gradle:8.8-jdk21-alpine AS build

WORKDIR /workspace

COPY backend/build.gradle* backend/settings.gradle* ./
COPY backend/src ./src

RUN gradle --no-daemon clean bootJar -x test

# ---------- Runtime Stage ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /workspace/build/libs/*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://127.0.0.1:8080/api/healthz | grep -q 'ok' || exit 1

ENTRYPOINT ["java","-jar","app.jar"]
