# ---------- Build Stage ----------
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /workspace

COPY backend/gradlew ./gradlew
COPY backend/gradlew.bat ./gradlew.bat
COPY backend/gradle ./gradle
COPY backend/build.gradle backend/settings.gradle ./

RUN chmod +x ./gradlew

RUN ./gradlew --no-daemon help || true

COPY backend/src ./src

RUN ./gradlew --no-daemon clean bootJar -x test

# ---------- Runtime Stage ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY --from=build /workspace/build/libs/*.jar ./app.jar

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=3s --start-period=45s --retries=3 \
  CMD curl -fsS http://127.0.0.1:8081/actuator/health >/dev/null || exit 1

ENTRYPOINT ["java","-jar","app.jar"]
