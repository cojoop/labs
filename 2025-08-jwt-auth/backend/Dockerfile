# ---------- Build Stage ----------
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /workspace

COPY backend/gradlew backend/settings.gradle* backend/build.gradle* backend/gradle ./
RUN chmod +x gradlew
RUN ./gradlew --no-daemon dependencies || true

COPY backend/src ./src
RUN ./gradlew --no-daemon clean bootJar -x test

# ---------- Runtime Stage ----------
FROM eclipse-temurin:21-jre-alpine AS runner

WORKDIR /app

COPY --from=builder /workspace/build/libs/*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://127.0.0.1:8080/actuator/health | grep -q '"status":"UP"' || exit 1

ENTRYPOINT ["java","-jar","app.jar"]
