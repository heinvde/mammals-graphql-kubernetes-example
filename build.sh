#!/bin/bash

docker-compose -f services/mammals/db/docker-compose.yml build
docker-compose -f services/mammals/mutate-mammals/docker-compose.yml build
docker-compose -f services/mammals/query-mammals/docker-compose.yml build
docker-compose -f api/graphql/docker-compose.yml build