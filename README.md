# EOLO PLANER
Project used as a practice to create a small distributed application which is using different communication strategies.
API REST, gRPC and RabbitMQ.

## DEPLOYMENT

The different services are using docker for creating their respective docker images. Different strategies were used to
create the images.

**SERVER**

- [Dockerfile](https://docs.docker.com/engine/reference/builder/)

**WORKER**

- [Multistage docker file](https://docs.docker.com/develop/develop-images/multistage-build/)

- [JIB](https://github.com/GoogleContainerTools/jib)

**EXTERNAL_SERVICE**

- [Buildpack](https://devcenter.heroku.com/categories/reference)

### DEPLOYMENT WITH DOCKER-COMPOSE

Run the following command to deploy the application locally using docker.

```bash
docker compose up
```
_Before using docker you must have installed docker_

### DEPLOYMENT WITH VS CODE (REMOTE CONTAINERS)

Before running the services with remote container technology, you are required to install remote container plugin from 
your vs code editor.

Once the plugin is installed, run the following command using docker.

```bash
docker compose -f docker-compose-dev.yml
```

This yml file is used to run auxiliary services as MongoDB, MySQL and RabbitMQ. These technologies are necessary for the
deployment of the different services as they are using them.

Once the services are up, you are able to run the different services with VS Code, supported by remote container
technology, as it was mentioned above.

docker-compose.yml
File used to deploy both the different services and the auxiliary services (MySQL, MongoDB and RabbitMQ).

##### **VOLUMES**

Auxiliary services are using persistence folder to save data. In this way, every time an auxiliary services is re-run, 
the data will be available as there was before the container was deleted.

There are 3 folders for the different services.

###### DOCKER-COMPOSE
- mongo_db
- mysql_db
- rabbitmq

###### DOCKER-COMPOSE-DEV
- mongo_db
- mysql_db
- rabbitmq