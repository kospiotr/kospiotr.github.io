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


## App Engine
Managed App Platform

Use cases: Web sites. Mobile app and gaming backends. RESTful APIs. Internal Line of Business (LOB) apps. Internet of things (IoT) apps.

## Container Engine
Managed Kubernetes/Containers

Use cases: Containerized workloads. Cloud-native distributed systems. Hybrid applications.

## Cloud Functions
Serverless Microservices


# Storage and Databases

## Cloud Storage
Object/File Storage & Serving

## Cloud SQL (NEW PostgreSQL)
Managed MySQL and PostgreSQL

## Cloud Bigtable
HBase compatible NoSQL

## Cloud Datastore
Horizontally Scalable Document DB

## Cloud Spanner
Horizontally Scalable Relational DB

## Persistent Disk
VM-attached disks


# Big Data

## BigQuery
Managed Data Warehouse/Analytics

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
  * Roles - sets of permissions
  
    (Primitive roles, Predefined roles, Custom roles)
  * Permissions
* Resource: 


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
