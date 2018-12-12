---
layout: wiki
title: Kubernetes
comments: false
toc: true
slideshow: true
editurl: wiki/kubernetes.md
---

* [https://kubernetes.io/docs/user-guide/kubectl-cheatsheet/](https://kubernetes.io/docs/user-guide/kubectl-cheatsheet/)
* `source <(kubectl completion bash)`

# Samples

## Application

```
cat > app.js <<EOF
const http = require('http');
const os = require("os");
const hostname = '0.0.0.0';
const port = 80;
const server = http.createServer((req, res) => {
    console.log('Request: ' + req.url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World from ' + os.hostname() + '\n');
});
server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});
process.on('SIGINT', function() {
    console.log('Caught interrupt signal and will exit');
    process.exit();
});
EOF
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

## Building image
* `docker build -t gcr.io/PROJECT_ID/hello-node:v1 .` - 
* `gcloud docker -- push gcr.io/PROJECT_ID/hello-node:v1`

# Deployment
* `kubectl run hello-node 
    --image=gcr.io/PROJECT_ID/hello-node:v1 
    --port=8080` - create and run deployment
* `kubectl get deployments` - list all deployments
* `kubectl edit deployment hello-node` - after introduce change in the image and release given deployment can be updated with new container image version and apply it

# Status
* `kubectl get pods` - list all running pods
* `kubectl get pods -l "key1=value1,key2=value2"` - list all pods with multiple labels
* `kubectl get pods <pod-name> --show-labels` - list pods with labels
* `kubectl label pods <pod-name> 'key=value'` - set labels to the pod
* `kubectl cluster-info`
* `kubectl config view`
* `kubectl get events`
* `kubectl logs <pod-name>`
* `kubectl describe pods <pod-name>`

# Interacting with pods
* `kubectl port-forward monolith 8080:80` - forwarding port from pod 80 to local 8080
* `kubectl exec <pod-name> --stdin --tty /bin/sh` - "enter" container (ssh replacement)
* `kubectl exec <pod-name> --stdin --tty -c <container-name> /bin/sh` - "enter" container (ssh replacement)


# Services

Types:
* **ClusterIP** (internal) - the default type means that this Service is only visible inside of the cluster
* **NodePort** - gives each node in the cluster an externally accessible IP
* **LoadBalancer** - adds a load balancer from the cloud provider which forwards traffic from the service to Nodes within it.

Commands:
* `kubectl get services` - list all services
* `kubectl expose deployment <deployent-name> --type="LoadBalancer"` --port=8080 - create service of type LoadBalancer

# Scaling
* `kubectl scale deployment <deployent-name> --replicas=4` - manually scale pods to the count of total = 4

# Rolling update
* `kubectl edit deployment <deployent-name>` - vim deployment descriptor
* `kubectl rollout history deployment/<deployent-name>` - rolling history
* `kubectl rollout pause deployment/<deployent-name>` - rolling update pause
* `kubectl rollout status deployment/<deployent-name>` - rolling status
* `kubectl get pods -o jsonpath --template='{range .items[*]}{.metadata.name}{"\t"}{"\t"}{.spec.containers[0].image}{"\n"}{end}'` - erify rolling status on pods directly
* `kubectl rollout undo deployment/hello` - uno latest deployment
* canary release: [https://google.qwiklabs.com/focuses/7013](https://google.qwiklabs.com/focuses/7013)
* blue green deployment: [https://google.qwiklabs.com/focuses/7013](https://google.qwiklabs.com/focuses/7013)


# Web console
* `gcloud container clusters get-credentials hello-world \
    --zone us-central1-f --project <PROJECT_ID>` - configure `kubectl` command before usage
* `kubectl proxy --port 8081 and open /ui` - proxy traffic to the kubernetes console

# Create object
* `kubectl create -f <object>.yaml` - create object from file

# Debbuging
* `kubectl -n kube-system get cm kubeadm-config -oyaml`
* `kubectl get pods --all-namespaces`
* `kubectl -n <namespace-name> describe pod <pod name>`
* `kubectl -n mortgages-dev2 logs -p  <pod name> `

