---
layout: wiki
title: Docker
comments: false
toc: true
editurl: wiki/docker.md
---

# Basic commands

Running:
 * `docker run hello-world` - run container from `hello world` image
 * `docker images` - list all downloaded images
 * `docker ps` - list all running containers
 * `docker ps -a` - list all containers including all which are stopped
 
Sample application:
```
cat > app.js <<EOF
const http = require('http');

const hostname = '0.0.0.0';
const port = 80;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});

process.on('SIGINT', function() {
    console.log('Caught interrupt signal and will exit');
    process.exit();
});
```

Sample Docker file:
```
cat > Dockerfile <<EOF
# Use an official Node runtime as the parent image
FROM node:6

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Make the container's port 80 available to the outside world
EXPOSE 80

# Run app.js using node when the container launches
CMD ["node", "app.js"]
EOF
```
Building
 * `docker build . -t image_name` - build image from sources with 
 * `sudo docker exec -i -t container_name /bin/bash`
 * `docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)` - stop and remove all containers
 * `docker rm $(docker ps -a -q)` - delete all containers
 * `docker rmi $(docker images -q)` - Delete all images
 * `docker system df` - docker disk usage
 * `docker ps --format='{{.ID}}\t{{.Label "pl.xperios.project"}}'` - outputs all running container and label with key `pl.xperios.project`
 * 
