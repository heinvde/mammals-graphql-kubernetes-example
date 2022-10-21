#!/bin/bash

docker-compose -f services/mammals/db/docker-compose.yml push
docker-compose -f services/mammals/mutate-mammals/docker-compose.yml push
docker-compose -f services/mammals/query-mammals/docker-compose.yml push
docker-compose -f api/graphql/docker-compose.yml push