# Stage 1 - build
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# copy mvnw and maven wrapper if present at backend/
COPY .mvn .mvn
COPY mvnw pom.xml ./

# copy the rest of backend sources into the image
COPY . .

WORKDIR /app
# make mvnw executable just in case (Linux)
RUN chmod +x ./mvnw || true

WORKDIR /app
# build the project (produces target/*.jar)
RUN ./mvnw -DskipTests=true package

# Stage 2 - runtime
FROM eclipse-temurin:17-jre
WORKDIR /app

# copy only the assembled jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
