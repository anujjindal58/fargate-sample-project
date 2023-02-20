
. ./common.sh
TAG='1.0.3'
echo " building "$IMAGE:$TAG
docker build -t $IMAGE:$TAG .
