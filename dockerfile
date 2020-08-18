FROM node:lts-alpine as build-stage
RUN npm install -g cnpm --reistry=https://registry.npm.taobao.org

WORKDIR /app
COPY . .

RUN rm -f .env.*

ENV VUE_APP_TEST_VALUE="my test value"

RUN cnpm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
