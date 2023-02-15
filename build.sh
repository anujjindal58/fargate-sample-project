
. ./common.sh
TAG='latest'
echo " building "$IMAGE:$TAG
docker build -t $IMAGE:$TAG .
