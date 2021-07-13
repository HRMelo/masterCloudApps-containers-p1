


DOCKERHUB_USERNAME=hrmmelo

SERVER_IMAGE_NAME="${DOCKERHUB_USERNAME}/server"

printf "COMPILING SERVER IMAGE FROM DOCKERFILE WITH NAME %s" ${SERVER_IMAGE_NAME}
docker build -t ${SERVER_IMAGE_NAME} ./server

printf "PUBLISHING %s" ${SERVER_IMAGE_NAME}
docker push ${SERVER_IMAGE_NAME}

WORKER_IMAGE_NAME_MULTISTAGE="${DOCKERHUB_USERNAME}/workerms"
WORKER_IMAGE_NAME_JIB="${DOCKERHUB_USERNAME}/workerjib"

printf "COMPILING WORKER IMAGE FROM DOCKERFILE WITH NAME %s" ${WORKER_IMAGE_NAME_MULTISTAGE}
docker build -t ${WORKER_IMAGE_NAME_MULTISTAGE} ./worker

printf "COMPILING WORKER IMAGE USING JIB WITH NAME %s" ${WORKER_IMAGE_NAME_JIB}
mvn -f worker/ install jib:build -Dimage=${WORKER_IMAGE_NAME_JIB}

printf "PUBLISHING %s" ${WORKER_IMAGE_NAME_MULTISTAGE}
docker push ${WORKER_IMAGE_NAME_MULTISTAGE}

EXTERNALSERVICE_IMAGE_NAME="${DOCKERHUB_USERNAME}/externalservice"

printf "COMPILING EXTERNAL_SERVICE IMAGE USING BUILDPACKS WITH NAME %s" ${EXTERNALSERVICE_IMAGE_NAME}
pack build ${EXTERNALSERVICE_IMAGE_NAME} --path ./externalservice --builder gcr.io/buildpacks/builder:v1

printf "PUBLISHING %s" ${EXTERNALSERVICE_IMAGE_NAME}
docker push ${EXTERNALSERVICE_IMAGE_NAME}