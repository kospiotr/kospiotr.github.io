---
layout: wiki
title: Docker
comments: false
toc: true
editurl: wiki/docker.md
---

# Basic commands

 * ```docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)``` - stop and remove all containers
 * ```docker rm $(docker ps -a -q)``` - delete all containers
 * ```docker rmi $(docker images -q)``` - Delete all images
 * ```docker system df``` - docker disk usage
 * ```docker ps --format='{{.ID}}\t{{.Label "pl.xperios.project"}}'``` - outputs all running container and label with key `pl.xperios.project`
