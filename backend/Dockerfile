FROM maven:3.9-eclipse-temurin-17 as build
WORKDIR /workspace/app

# Fix SSL issues
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Configure Maven to use HTTPS
COPY pom.xml .
RUN mkdir -p ~/.m2 && echo '<?xml version="1.0" encoding="UTF-8"?><settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd"><mirrors><mirror><id>maven-default-http-blocker</id><mirrorOf>external:http:*</mirrorOf><name>Pseudo repository to mirror external repositories initially using HTTP.</name><url>http://0.0.0.0/</url><blocked>true</blocked></mirror></mirrors></settings>' > ~/.m2/settings.xml

COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

VOLUME /tmp

# Create a non-root user
RUN addgroup -S spring && adduser -S spring -G spring

COPY --from=build /workspace/app/target/*.jar app.jar
RUN chown spring:spring /app/app.jar

USER spring

ENTRYPOINT ["java", "-jar", "/app/app.jar"] 