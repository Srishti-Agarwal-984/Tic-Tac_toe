# Serve static files using nginx
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
