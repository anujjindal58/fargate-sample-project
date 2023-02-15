IMAGE="jindalanuj/sqs-subscribe-image"
# TAG="0.1.0"
TAG="latest"
echo " building "$IMAGE:$TAG
docker build -t $IMAGE:$TAG .
docker push $IMAGE:$TAG