FROM nginx:latest
MAINTAINER Dan Klenin <danila.klenin@gmail.com>
COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d