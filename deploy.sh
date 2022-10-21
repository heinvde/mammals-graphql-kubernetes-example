#!/bin/bash

ENV=${1:-dev}
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [[ "$ENV" != "prod" && "$ENV" != "dev" ]]
then
  echo "ERROR: Environment must be 'prod' or 'dev. Recived environment '$ENV'" 1>&2
  exit 1
fi

echo -e "$(date '+%d/%m/%Y %H:%M:%S') => ${GREEN}Deploying mammals graphql kubernetes example for ${RED}$ENV${NC}"
kubectl apply -k kubernetes/${ENV}

echo -e "$(date '+%d/%m/%Y %H:%M:%S') => ${GREEN}Waiting for pods to be created${NC}"
sleep 2

kubectl get pods -n ${ENV}

echo -e "$(date '+%d/%m/%Y %H:%M:%S') => ${GREEN}Done.${NC}"