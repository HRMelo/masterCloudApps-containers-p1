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
_You have to install docker before using it._

### DEPLOYMENT WITH [VSCODE (REMOTE CONTAINERS)](https://code.visualstudio.com/docs/remote/containers)

Before running the services with remote container technology, you are required to install remote container plugin from 
your VSCode editor.

Once the plugin is installed, run the following command using docker.

```bash
docker compose -f docker-compose-dev.yml
```

This yml file is used to run auxiliary services like MongoDB, MySQL and RabbitMQ. These technologies are necessary for the
deployment of the different services due to they are using them.

Once the services are up, you are able to run the different services with VSCode, supported by remote container
technology, as it was mentioned above.

##### **VOLUMES**

Auxiliary services are using the persistence folder to save data. In this way, every time an auxiliary service is 
re-run, the data will be available as there were before the container was deleted.

There are 3 folders for the different services.

###### DOCKER-COMPOSE
- mongo_db
- mysql_db
- rabbitmq

###### DOCKER-COMPOSE-DEV
- mongo_db_dev
- mysql_db_dev
- rabbitmq_dev