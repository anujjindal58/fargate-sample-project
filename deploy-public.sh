. ./common.sh
TAG="latest"
echo " building ".$PUBLIC_IMAGE$IMAGE_NAME:$TAG
docker build -t $PUBLIC_IMAGE$IMAGE_NAME:$TAG .
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin $PUBLIC_IMAGE
echo $PUBLIC_IMAGE$IMAGE_NAME:$TAG
docker push $PUBLIC_IMAGE$IMAGE_NAME:$TAG