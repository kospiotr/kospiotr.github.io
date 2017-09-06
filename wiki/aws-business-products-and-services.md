---
layout: wiki
title: AWS Business - products and services
comments: false
toc: false
editurl: wiki/aws-business-products-and-services.md
---

* Compute
  * Amazon EC2
    * what is this
      * web service providing resizable compute capacity
      * provides dedicated virtual servers
      * have remote access via API accessible with SDK written in many languages
    * instances
      * types: memory optimized, compute optimized, storage and I/O optimized, GPU optimized, General Purpose
      * sizes: from Micro to x8 large
      * Amazon Machine Image (AMI) - allows to choose O/S, type, version, can create and manage own AMIs
  * Auto Scalling - automatically scale Amazon EC2 capacity up or down
  * Elastic Load Balancing - automatically distribute traffic across multiple Amazon EC2 instances
  
* Storage
  * Amazon S3 - internet scale storage via API; high durability, high latency; object store that cannot be modified, static flies like images and videos; stored in one of several AWS Regions
  * Amazon EBS - block storage for use with Amazon EC2; behaves like hard drive, can be modified, replicated in AZ
  * Amazon Glacier - storage for archiving and backup; low cost, performance not critical
  * AWS Storage Gateway - allows to securely connect external services to AWS storage; examples: connects an on-premises software apps with cloud-based storage, securely upload data to AWS Cloud, backup data on the AWS, mirror on-premises data
  * AWS Import/Export Snowball - securelly transfering data to/from AWS
  * Amazon CloudFront - global CDN

* Database
  * Amazon Relational Database (RDS) - managed relational database service; available: MySQL, Oracle, Postgres, MsSQL
  * Amazon RDS For Aurora - newest MySQL compatibile relational DB engine
  * Amazon DynamoDB - managed NoSQL DB service
  * Amazon ElastiCache - in-memory caching service

* Networking
  * VPC - private, isolated section of the AWS cloud; define private and public networks and control inbound and outbound traffic
  * AWS Direct Connect - private connectivity between AWS and your data center
  * Amazon Route 53 - DNS web service

* Security & Identify
  * AWS IAM - manage users, groups, permissions
  * AWS Dirrectory Service - connecting existing on premises MS Directory
  * AWS CloudHSM - dedicated hardware security module appliances

* Monitoring and Usage Auditing
  * Amazon CloudWatch - monitor resources
  * AWS CloudTrail - records AWS API calls for your account; account audits
  * AWS Config - resource inventory configuration history; track configuration on the timeline

* Analytics
  * Amazon Redshift - fast, powerful, petabyte-scale data warehouse
  * Amazon Elastic MapReduce (EMR) - process large amounts of data, uses Hadoop
  * Amazon Kinesis - real-time data stream processing
  * Amazon QuickSight - SPICE (superfast, parallel, in-memory, calculation, engine)
  
* Application Services
  * Amazon AppStream - low latency service allowing stream resources to multiple receivers
  * Amazon Simple Queue Service (SQS)
  * Amazon Simple Notification Service (SNS)
  * Amazon Simple Email Service (SES)
  * Amazon CloudSearch
  * Amazon Elastic Transcoder

* Management Services
  * AWS Elastic Beanstalk - automate resource management, deploying, scaling services written in JAVA, .Net, PHP, NodeJS, Python Ruby; 
  * AWS OpsWorks - DevOps framework for app lifecycle management; allows to model and manage from LB to DBs
  * AWS CloudFormation - templates to deploy and manage; allows to create a collection of related AWS resources and provision them in an orderly and predictible fashion as a templates

* Mobile Services
  * Amazon Cognito - Amazon Cognito is a simple user identity and data synchronization service that helps you securely manage and synchronize app data for your users across their mobile devices.
  * AWS Device Farm - helps you improve the quality of your Android, Fire OS, and iOS apps by testing them against real phones and tablets in the AWS Cloud.

* Enterprise Applications
  * Amazon WorkSpaces - is a fully managed virtual desktop service in the cloud with strong administrative controls and feedback capabilities.
  * Amazon WorkDocs - is a fully managed, secure enterprise storage and sharing service with strong administrative controls and feedback capabilities that improve user productivity.
  * Amazon WorkMail - is a managed email and calendaring service that offers strong security controls and support for existing desktop and mobile clients.

# Resources

* https://www.cheatography.com/nire0510/cheat-sheets/aws-services/#downloads
