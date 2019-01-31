#!/usr/bin/env bash

# Version key/value should be on his own line
PACKAGE_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

REPOSITORY_HOST=434996601896.dkr.ecr.us-east-2.amazonaws.com

echo 'building' ${PACKAGE_VERSION}

docker build -t ${PACKAGE_NAME}:${PACKAGE_VERSION} .
docker tag ${PACKAGE_NAME}:${PACKAGE_VERSION} ${REPOSITORY_HOST}/${PACKAGE_NAME}:${PACKAGE_VERSION}

echo 'pushing' ${REPOSITORY_HOST}/${PACKAGE_NAME}:${PACKAGE_VERSION}

docker push ${REPOSITORY_HOST}/${PACKAGE_NAME}:${PACKAGE_VERSION}
