---
layout: wiki
title: Docker
comments: false
toc: true
editurl: wiki/docker.md
---

# Samples

# Init

* `docker run hello-world` - run container from `hello world` image

## Application

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

## Dockerfile

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

# Build
* `docker images` - list all downloaded images
* `docker build -t node-app:0.1 .` - build image from sources with with tag node-app:0.1
* `docker rm my-app` - remove image
 
# Run
* `docker ps` - list all running containers
* `docker ps -a` - list all containers including all which are stopped
* `docker run -p 4000:80 --name my-app node-app:0.1` - running container in attached mode
* `docker run -p 4000:80 --name my-app -d node-app:0.1` - running container in detached mode (in background)
* `docker stop my-app` - stop container

# Debug
* `docker logs <container-id>` - displays logs
* `docker logs -f <container-id>` - displays logs with follow
* `docker exec -it <container-id> /bin/bash` - "enter" container (ssh replacement)
* `docker inspect <container-id>` 
* `docker ps --format='{{.ID}}\t{{.Label "pl.xperios.project"}}'` - outputs all running container and label with key `pl.xperios.project` 

# Publish

To push images to your private registry hosted by gcr, you need to tag the images with a registry name. The format is `[hostname]/[project-id]/[image]:[tag]`. For gcr:
* `[hostname]` is gcr.io
* `[project-id]` is your project's ID
* `[image]` is your image name
* `[tag]` is any string tag of your choice. If unspecified, it defaults to "latest".

* `docker tag node-app:0.2 gcr.io/[project-id]/node-app:0.2` - create new image with new tag from existing one
* `gcloud docker -- push gcr.io/[project-id]/node-app:0.2` - push image to the gcr repository

# Clean up
* `docker system df` - docker disk usage
* `docker stop $(docker ps -a -q)` - stop all containers
* `docker rm $(docker ps -a -q)` - delete all containers
* `docker rmi $(docker images -q)` - delete all images
