#!/bin/bash
. ./common.sh
TAG="latest"
aws ecr get-login-password | docker login --username AWS --password-stdin $IMAGE
docker push $IMAGE:$TAG