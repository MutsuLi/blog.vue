wget http://download.redis.io/redis-stable.tar.gz
tar -zxvf redis-stable.tar.gz
docker pull mutsuli/blogapi:latest
docker run -d --name blogapi -p 9100:80 -d -e TZ="Asia/Shanghai" -v /etc/localtime:/etc/localtime:ro docker.io/mutsuli/blogapi
#
docker tag 82a9d864852b  mutsuli/blogvue:latest
docker push mutsuli/blogvue:latest

docker pull mutsuli/blogvue:latest
docker run -d --name blog.vue -p 8300:80 -d -e TZ="Asia/Shanghai" -v /etc/localtime:/etc/localtime:ro docker.io/mutsuli/blogvue
#
grep docker /proc/*/mountinfo | grep a5396a14c12a170294a7c2343798322e70cb0636309e1912ea64f7faa9de8f1e | awk -F':' '{print $1}' | awk -F'/' '{print $3}'