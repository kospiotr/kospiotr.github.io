---
layout: wiki
title: Google Cloud Platform
comments: false
toc: true
slideshow: true
editurl: wiki/gcp.md
---


# Compute
How to choose: [https://cloud.google.com/docs/choosing-a-compute-option](https://cloud.google.com/docs/choosing-a-compute-option)

## Compute Engine
Virtual Machines, Disks, Network

Docs: [https://cloud.google.com/compute/](https://cloud.google.com/compute/)

Features: 
 * Predefined Machine Types, 
 * Custom Machine Types, 
 * [Storage](https://cloud.google.com/compute/docs/disks/) (Standard persistent disks, SSD persistent disks, Local SSD, Cloud Storage buckets), 
 * Transparent Maintenance, 
 * Global Load Balancing, 
 * Linux & Windows Support, 
 * Batch Processing (Preemptible), 
 * Compliance & Security, 
 * Per-Second Billing, 
 * Automatic Discounts, 
 * Commitment savings, 
 * Containers

Pricing:
* Always Free Usage Limits
* Machine type pricing: predefined (micro, small, standard high cpu, high memory), custom
* Sustained use discounts: automatic discount for using VM more than 25% month time
* Committed use discounts: discount for using VM for commited longer time
* Charged for addons: extended memory, GPU, paid software images
* Network: Internet egress rates, load balancing, port forwarding, traffic through external IP addresses, VPN, Unused IP address
* Disk: persistent disk types, snapshot storage, local SSD

Use cases: Any workload requiring a specific OS or OS configuration. Currently deployed, on-premises software that you want to run in the cloud.

General commands:
* `gcloud config set compute/zone europe-west1-c` - set default zone
* `gcloud config set compute/region europe-west1` - set default region

Instance commands:
* `gcloud compute target-pools create pkosmowski-nginx-pool` - create load balancer (target pool)
* `gcloud compute instance-templates create pkosmowski-nginx-template 
         --metadata-from-file startup-script=startup.sh` - create instance template with given startup script
* `gcloud compute instance-groups managed create pkosmowski-nginx-group 
         --base-instance-name pkosmowski-nginx 
         --size 2 
         --template pkosmowski-nginx-template 
         --target-pool pkosmowski-nginx-pool` - create instance group of the minimal size = 2 with assigned target pool
* `gcloud compute firewall-rules create www-firewall --allow tcp:80` - create firewall rule to allow tcp traffic 

Script for installing nginx on startup:
```
#! /bin/bash
apt-get update
apt-get install -y nginx
service nginx start
sed -i -- 's/nginx/Google Cloud Platform - '"$HOSTNAME"'/' /var/www/html/index.nginx-debian.html
```

## App Engine
Managed App Platform

Features:
* Popular Languages - Node.js, Java, Ruby, C#, Go, Python, or PHP—or bring your own language runtime
* Open & Flexible - Custom runtimes allow you to bring any library and framework to App Engine by supplying a Docker container
* Fully Managed - A fully managed environment lets you focus on code while App Engine manages infrastructure concerns
Monitoring, 
* Logging & Diagnostics - Google Stackdriver gives you powerful application diagnostics to debug and monitor the health and performance of your app
* Application Versioning - Easily host different versions of your app, easily create development, test, staging, and production environments
* Traffic Splitting - Route incoming requests to different app versions, A/B test and do incremental feature rollouts
* Application Security - Help safeguard your application by defining access rules with App Engine firewall and leverage managed SSL/TLS certificates* by default on your custom domain at no additional cost
* Services Ecosystem - Tap a growing ecosystem of GCP services from your app including an excellent suite of cloud developer tools

Standard environment:
* Preconfigured runtime: Java 7, Java 8, Python 2.7, Go and PHP
* Includes libraries supporting Standard Env API

Persistent Storage:


Pricing:
* Standard environment - depends on the instance class
* Flexible envirnoment - CPU, RAM, HDD
* Datastore - capacity, reads, writes, deletes, network, excluding small operations
* Search API

## Container Engine
Managed Kubernetes/Containers

Use cases: Web sites. Mobile app and gaming backends. RESTful APIs. Internal Line of Business (LOB) apps. Internet of things (IoT) apps.
Use cases: Containerized workloads. Cloud-native distributed systems. Hybrid applications.

Commands:
* `docker build -t gcr.io/PROJECT_ID/hello-node:v1 .` - build image
* `docker run -d -p 8080:8080 gcr.io/PROJECT_ID/hello-node:v1` - create container and run it
* `docker ps` - list all running containers
* `docker stop <container-id>` - stop container
* `gcloud docker -- push gcr.io/PROJECT_ID/hello-node:v1` - push docker image to gcloud repository
* `gcloud config set project PROJECT_ID` - set project as default in order not to specify it explicit every time
* `gcloud container clusters create hello-world 
                --num-nodes 3 
                --machine-type f-micro 
                --zone us-central1-f` - create cluster with 3 nodes of micro type in us-central zone
* `kubectl run hello-node 
    --image=gcr.io/PROJECT_ID/hello-node:v1 
    --port=8080` - create and run deployment
* `kubectl get deployments` - list all deployments
* `kubectl get pods` - list all running pods
* `kubectl cluster-info`
* `kubectl config view`
* `kubectl get events`
* `kubectl logs <pod-name>`
* `kubectl expose deployment hello-node --type="LoadBalancer"` - create service of type LoadBalancer
* `kubectl get services` - list all services
* `kubectl scale deployment hello-node --replicas=4` - manually scale pods to the count of total = 4
* `kubectl edit deployment hello-node` - after introduce change in the image and release given deployment can be updated with new container image version and apply it
* `gcloud container clusters get-credentials hello-world \
    --zone us-central1-f --project <PROJECT_ID>` - configure `kubectl` command before usage
* `kubectl proxy --port 8081 and open /ui` - proxy traffic to the kubernetes console

## Cloud Functions
Serverless Microservices driven with events

Use cases: Data Processing / ETL, Webhooks, Lightweight APIs, Mobile Backend, IoT

Key features:
* write nodejs functions that are triggered with:
  * http call
  * cloud bucket content modification
  * pub / sub topic event
* no need to maintain servers, however:
  * you must declare resource on which it will be running: CPU, memory
  * you must create bucket where those functions will be stored or as an alternative they can be hosted in GIT Repository

Pricing:
* Free first 2 million messages
* CPU type
* Compute time (CPU usage)
* Network - egress data

# Storage and Databases

## Cloud Storage
Object/File Storage & Serving

## Cloud SQL (NEW PostgreSQL)
Managed MySQL and PostgreSQL

## Cloud Bigtable
HBase compatible NoSQL, collumnar database running on Hadoop

Key features:
* Distributed
* NoSQL - no joins, no grouppings, no order by, no indexes except id, o constraints
* Only CRUD operations are supported
* ACID at the row level
* Denormalized data

## Cloud Datastore
Horizontally Scalable Document DB like MongoDB, CouchDB

Key features:
* NoSQL document DB
* Atomic transactions
* Strong consistency for the entity, eventual consitency for the query
* Indices for fast lookup, all queris using indices
* Query result depends on he result set instead of dataset size
* No joins
* Slow updates
* Can't filter on subquery result
* Can't have more than 1 inequality filter
* Multitenacy - can use namespaces for agregating data within the same kinds
* Transaction are optional
* Serverless, there is no instance

Avoid when:
* Need strong support for transactions, use instead SQL or Spanner
* Need support non hierarchical or unstructured data, use instead BigTable or Storage
* Need analytics (OLAP) / BI / data warehousing, use instead BigQuery
* Need to store Blobs > 10MB, use instead Storage
* Need to frequent reads and writes by key

Use when:
* Need to scale for read prformance
* Use when data is hierarchical with key/value

## Cloud Spanner
Horizontally Scalable Relational DB

## Persistent Disk
VM-attached disks


# Big Data

Hadoop base terminology:
* HDFS - Hadoop distributed file system - stores data which needs to be processed and the data which are the result of the processing
* MapReduce - framework which defines a data processing task 
* YARN - yet another resource - framework which runs data processing tasks

Hadoop ecosystem technologies:
* HIVE - provides SQL interface to Hadoop - OLAP sources, in GCP it's BigQuery
* HBase - columnar (NoSQL) data base management system on top of Hadoop, in GCP it's BigTable
* Pig - data manipulation language which allows reading unstructured data and writing as structured, for example reading logs and witing them to HDFS, it's GCP DataFlow
* Spark - distributed compute engine used along with Hadoop, it's GCP DataFlow
* Oozie - A tool to schedule workflows on all Hadoop ecosystem technologies in other words it makes Hadoop being managed as Dataproc is doing on GCP
* Kafka - stream data process in the realtime, equivalent in GCP is Pub / Sub

Flow:

Map Reduce -> YARN -> HDFS

## BigQuery
Managed Data Warehouse/Analytics

Key features:
* SQL queries with Google storage underneeth
* Fully mnaged - no servers, resources deployed
* Storage internal in maintained by BigQuery or external from BigTable / Cloud Storage etc
* Schema Auto detection
* Loading data: 
  * with batches: csv, JSON, Avro, GCP Datastore backups 
  * with streams

## Cloud Dataflow
Managed Data Processing

## Cloud Dataproc
Managed Spark and Hadoop

## Cloud Datalab
Visualize and Explore Data

## Cloud Dataprep (NEW)
Visual Data Preparation Tool

## Cloud Pub/Sub
Distributed Real-time messaging

## Genomics
Managed Genomics Platform

## Data Studio
Collaborative Dashboards


# Networking

## Cloud Virtual Network
Software Defined Networking

## Cloud Load Balancing
Multi-region Load Distribution

Network Load Balancing (NLB) L4
* Region / Cross-Region - NLB supports only within a region. Does not support cross-region load balancing.
* Load balancing based on - NLB is based on IP address, port and protocol type. Any TCP/UDP traffic, even SMTP can be load balanced.
* Packet inspection - Packet inspection is possible and load balance based on packets
* Instance Group - No need of creating instance group. Target pools need to be created. Instance can be just tagged to the pool. Ideal for unmanaged instance group where instances are non homogeneous.     
* Workflow - Forwarding rules is the starting point. It directs the request to the target pools from which compute engines will pick the request. Forwarding rules -> target pool -> instances                           
* Types of load balancer - Basic network load balancer which directs the request based on IP address, port and the protocol within the region. 
* Session affinity - Session affinity can be set, but only during the creation of target pool. Once it is set, the value cannot be changed.                    
* Health check - Health check is optional, but network load balancing relies on HTTP Health checks for determining instance health. 

Commands:
* `gcloud compute forwarding-rules list`
* `gcloud compute forwarding-rules create pkosmowski-nginx-lb 
         --region europe-west1 
         --ports=80 
         --target-pool pkosmowski-nginx-pool` - create forwarding rule (LB Frontend) which allows accessing LB from outside


HTTP(S) Load Balancing (HLB) L7
* Region / Cross-Region - HLB supports both within cross-region load balancing.
* Load balancing based on - HLB is based only on HTTP and HTTPS protocols.
* Packet inspection - HLB cannot inspect packets.
* Instance Group - Managed / UnManaged Instance group is necessary for creating HTTP / HTTPS load balancer.
* Workflow - This is quite complex in HTTP(s) load balancer. Global forwarding rulesroutes direct the request     
to target HTTP proxy, which in turn checks the URL map to determine appropriate backend services. These services in turn direct the request to the instance group. Global forwarding rules -> Target HTTP proxy -> URL map -> Backend Sevices -> instance group
* Types of load balancer - 
1. Cross-region load balancer uses only one global IP address and routes the request to the nearest region. 
2. Content-based load balancer is based on the URL path. Different path rules need different backend services. for eg: /video and /static require two separate backend services. 
* Session affinity - 
1. Client IP Affinity: This directs the same client ip to same backend instance by              
computing hash of the IP.
2. Generated Cookie Affinity: Load balancer stores cookie in clients and directs the same client to same instance with the help of retrieved cookie.
* Health check - Health can be verified by either using HTTP heath check or HTTPS health check.          

Commands:
* `gcloud compute http-health-checks create pkosmowski-http-basic-check` - create healthcheck
* `gcloud compute instance-groups managed 
       set-named-ports pkosmowski-nginx-group 
       --named-ports http:80` - add named port to the instance group which 
* `gcloud compute backend-services add-backend pkosmowski-nginx-backend 
    --instance-group pkosmowski-nginx-group 
    --instance-group-zone europe-west1-c 
    --global` - Add the instance group into the backend service
* `gcloud compute url-maps create pkosmowski-web-map 
    --default-service pkosmowski-nginx-backend` - Create a default URL map that directs all incoming requests to the given instances
* `gcloud compute target-http-proxies create pkosmowski-http-lb-proxy 
    --url-map pkosmowski-web-map` - Create a target HTTP proxy to route requests to the URL map
* `gcloud compute forwarding-rules create pkosmowski-http-content-rule 
        --global 
        --target-http-proxy pkosmowski-http-lb-proxy 
        --ports 80` - create forwarding rule (LB Frontend) which allows accessing LB from outside


## Cloud CDN
Content Delivery Network

## Cloud Interconnect
Peer with GCP

## Cloud DNS
Programmable DNS Serving


# Machine Learning

## Cloud Machine Learning Engine
Managed TensorFlow/ML

## Cloud Jobs API (NEW)
ML Job Search and Discovery

## Cloud Natural Language
Text Parsing and Analysis

## Cloud Speech API
Convert Speech to Text

## Cloud Translation API
Language Detection and Translation

## Cloud Vision API
Image Recognition and Classification

## Cloud Video Intelligence API (NEW)
Scene-level Video Annotation


# Identity & Security

## Cloud IAM
Resource Access Control 

Docs: [https://cloud.google.com/iam/docs/overview](https://cloud.google.com/iam/docs/overview)

**Who** can do **what** on which **resource**

* Who:  Google account, Service account, Google group, G Suite domain, Cloud Identity domain
* What: 
  * Roles - sets of permissions; types: Primitive roles, Predefined roles (permissions to the specific service), Custom roles
  * Permissions
* Resource: Cloud Platform resources are organized hierarchically, where the Organization node is the root node in the hierarchy, the projects are the children of the Organization, and the other resources are the children of projects. Each resource has exactly one parent.

Other features:
* Automatic (SSH) key management
* Manual key management (SSH key in project or resource metadata section )
* sudo

Best practices:
* Reuse your existing Identities - import to G-Suite users and groups from existing on-premises via Google Cloud Directory Sync 
* Don't store keys in code - create service account and if app is using other Google services via SDK libraries then:
  * app installed on GCP is already authorized and don't need to use keys at all
  * for local development app create environment variable `GOOGLE_APPLICATION_CREDENTIALS` with path to the key
* Use 2 step verification
* Disable SSH password authentication
* Disable root login and use sudo instead
* Grant least privilege - reduce the number of accounts that perform powerfull operations
* Grant Roles to Groups, not Users
* Grant least privileges to applications - create service account per application component
* Rotate keys - service account keys, ssh keys
* No secrets in instance metadata - everybody who can read instance metadata can see secrets, instead save them in the Cloud Storage and give service account permission to read it
* Leave a trace - retain audit logs in Cloud Storage or Big Query, forward guest events to centralized logging

## Cloud Identity-Aware Proxy (NEW)
Identity-based App Signin

## Cloud Data Loss Prevention API (NEW)
Redact Sensitive Data

## Security Key Enforcement (NEW)
2-Step Key Verification

## Cloud Key Management Service (NEW)
Hosted Key Management Service

## Cloud Resource Manager
Cloud Project Metadata Management

## Cloud Security Scanner
App Engine Security Scanner


# Management Tools

## Monitoring
Infrastructure and Application Monitoring

## Logging
Centralized Logging

## Error Reporting
App Error Reporting

## Trace
App Performance Insights

## Debugger
App Debugging

## Cloud Deployment Manager
Templated Infrastructure Deployment

## Cloud Endpoints
Cloud API Gateway

## Cloud Console
Web-based Management Console

## Cloud Shell
Browser-based Terminal/CLI

## Cloud Mobile App
iOS/Android GCP Manager App

## Cloud Billing API
Programmatically Manage GCP Billing

## Cloud APIs
APIs for Cloud Services


# Developer Tools

## Cloud SDK
CLI for GCP

Usefull commands:

* `gcloud auth list` - active account
* `gcloud config list project` - active project
* `gcloud compute ssh <instance-id>` - connect to VM instance with ssh
* `gcloud alpha shell` - interactive command mode

## Container Registry
Private Container Registry/Storage

## Container Builder (NEW)
Build/Package Container Artifacts

## Cloud Source Repositories
Hosted Private Git Repos

## Cloud Tools for Android Studio
Android Studio GCP Tools

## Cloud Tools for IntelliJ
IntelliJ GCP Tools

## Cloud Tools for PowerShell
PowerShell GCP Tools

## Cloud Tools for Visual Studio
Visual Studio GCP Tools

## Cloud Tools for Eclipse
Eclipse GCP Tools

## Gradle App Engine Plugin (NEW)
Gradle App Engine Plugin

## Maven App Engine Plugin (NEW)
Maven App Engine Plugin

## Cloud Test Lab
Mobile Device Testing Service

#Pricing
[https://cloud.google.com/products/calculator/](https://cloud.google.com/products/calculator/)
