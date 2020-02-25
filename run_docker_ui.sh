#!/bin/bash
docker-machine start default
docker-machine env default
eval "$(docker-machine env default)"
host_ip=$(docker-machine ip default)
echo $host_ip

export API_URL=http://$host_ip:8000
echo $API_URL

while ! nc -z $host_ip 8000;
do
    echo Wait for API to start...;
    sleep 1;
done;
echo API is running;

docker-compose -f ./docker-compose.yml up --build -d web
