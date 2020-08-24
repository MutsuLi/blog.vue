wget http://download.redis.io/redis-stable.tar.gz
tar -zxvf redis-stable.tar.gz
docker build -t blogvue .
docker pull mutsuli/blogapi:latest
docker run -d --name blog.api -p 9100:80 -d -e TZ="Asia/Shanghai" -v /etc/localtime:/etc/localtime:ro docker.io/mutsuli/blogapi
#
docker tag blogvue  mutsuli/blogvue:latest
docker push mutsuli/blogvue:latest

docker pull mutsuli/blogvue:latest
docker run -d --name blog.vue -p 8300:80 -d -e TZ="Asia/Shanghai" -v /etc/localtime:/etc/localtime:ro docker.io/mutsuli/blogvue
#
grep docker /proc/*/mountinfo | grep 16452ad5fcbe714b18439e2085c6b30ec6ffe1642440f0683678fa62d5ddd94c | awk -F':' '{print $1}' | awk -F'/' '{print $3}'
