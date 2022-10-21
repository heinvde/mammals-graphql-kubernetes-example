#!/bin/bash

(cd services/mammals/db && ./publish.sh)
(cd services/mammals/mutate-mammals && ./publish.sh)
(cd services/mammals/query-mammals && ./publish.sh)
(cd api/graphql && ./publish.sh)