# Stage 1 - build
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./
COPY backend/pom.xml ./backend-pom.xml
# copy backend source
COPY backend ./backend
WORKDIR /app/backend
RUN ./mvnw -DskipTests=true package

# Stage 2 - runtime
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
