FROM maven as builder
WORKDIR /worker
COPY pom.xml /worker/
RUN mvn clean verify
COPY /src /worker/src
RUN mvn package -o

FROM openjdk:8-jre-slim
WORKDIR /usr/src/app/
COPY --from=builder /project/target/*.jar /usr/src/app/
EXPOSE 8080
CMD [ "java", "-jar", "p3-worker-0.0.1-SNAPSHOT.jar" ]