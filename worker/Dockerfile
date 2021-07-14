FROM maven as builder
WORKDIR /worker
COPY pom.xml /worker/
RUN mvn clean verify --fail-never
COPY /src /worker/src
RUN mvn package

FROM openjdk:8-jre-slim
WORKDIR /usr/src/app/
COPY --from=builder /worker/target/worker.jar /usr/src/app/
EXPOSE 8080
CMD [ "java", "-jar", "worker.jar" ]