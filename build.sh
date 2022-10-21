#!/bin/bash

(cd services/mammals/db && ./build.sh)
(cd services/mammals/mutate-mammals && ./build.sh)
(cd services/mammals/query-mammals && ./build.sh)
(cd api/graphql && ./build.sh)