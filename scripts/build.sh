#!/bin/bash

cd "${BASH_SOURCE%/*}" || exit
cd ..

echo 'Building application ...'
npm run build
echo 'Removing old Docker container ...'
docker container rm -f return-order-frontend
echo 'Removing old Docker image ...'
docker rmi ritamchakraborty/return_order_frontend:latest
docker rmi return_order_frontend:latest
echo 'Creating Docker image ...'
docker build -t return_order_frontend:latest .
docker tag return_order_frontend:latest ritamchakraborty/return_order_frontend:latest
echo 'Pushing image to Docker Hub ...'
docker push ritamchakraborty/return_order_frontend:latest
echo 'Running Docker image ...'
docker run -it \
  --name return-order-frontend \
  --network return-order-network \
  -p 81:80 \
  ritamchakraborty/return_order_frontend:latest
