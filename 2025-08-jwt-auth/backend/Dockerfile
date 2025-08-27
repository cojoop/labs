# ---------- Build Stage ----------
FROM gradle:8.9-jdk17 AS builder
WORKDIR /app
COPY . .
RUN ./gradlew bootJar --no-daemon

# ---------- Runtime Stage ----------
FROM eclipse-temurin:17-jre AS runner
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
