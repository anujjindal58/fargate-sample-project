#!/bin/bash
. ./common.sh
TAG="1.0.3"
aws ecr get-login-password | docker login --username AWS --password-stdin $IMAGE
docker push $IMAGE:$TAG