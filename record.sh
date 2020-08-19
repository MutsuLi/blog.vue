wget http://download.redis.io/redis-stable.tar.gz
tar -zxvf redis-stable.tar.gz
docker pull mutsuli/blogapi:latest
docker run -d --name blogapi -p 9100:80 -v /ect/localtime:/ect/localtime docker.io/mutsuli/blogapi
#
docker tag 82a9d864852b  mutsuli/blogvue:latest
docker push mutsuli/blogvue:latest

docker pull mutsuli/blogvue:latest
docker run -d --name blog.vue -p 8300:80 -v /ect/localtime:/ect/localtime docker.io/mutsuli/blogvue
#
docker image rmi ce176b584a9e ce176b584a9e 024f5b507fbf 602865c8ae3f 0a08bced7975 bbe201e15317 -f
fb61179ccb4e3a369b024a9ae26afb6702d2a809a73d971b71265eef39e8201f
grep docker /proc/*/mountinfo | grep a5396a14c12a170294a7c2343798322e70cb0636309e1912ea64f7faa9de8f1e | awk -F':' '{print $1}' | awk -F'/' '{print $3}'