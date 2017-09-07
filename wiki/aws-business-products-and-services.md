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
  * Amazon EC2 Container Service ECS
    * build on top of EC2
    * supports building Docker based image clusters
    * allows to manipulate containers with API that allows:
      * launch / stop containers
      * check container status
      * access and manipulate features like: security groups, Elastic Load Balancing (ELB), EBS volumes, IAM roles
    * manage placement containers across the cluster
    * integrates own or thirdparty schedulers
    * no addiotional charge for EC2
  * AWS Lambda - event driven task compute service
    * no need to maintain addiotnal servers
    * only pay for computation
  * Auto Scalling - automatically scale Amazon EC2 capacity up or down
  * Elastic Load Balancing ELB - automatically distribute traffic across multiple Amazon EC2 instances

* Storage
  * Amazon S3 - internet scale storage via API; cheap, high durability, high latency; object store that cannot be modified, dedicated for serving static flies like images and videos, backups, storing files for Hadoop for analysis; stored in one of several AWS Regions
  * Amazon Elastic Block Storage (EBS) - block storage for use with Amazon EC2; behaves like hard drive, can be modified, replicated in AZ
    * features
      * can store from 1GB to 16 Tb per volume
      * can create partitions format, boot OS
      * suite for apps that require DB, file system or block level storage
    * durability and backup
      * automatic replication across AZs
      * can snapshot be backed-up to S3
    * I/O provisioning  - can scale up by provisioning specific level I/O performance
    * types
      * standard - bursty I/O workloads like O/S boot partitions
      * provisoned IOPS - I/O intense workloads like DBs
      * general puropse - moderate workloads like small DBs
  * Amazon Glacier - storage for archiving and backup; low cost, performance not critical
  * AWS Storage Gateway - allows to securely connect external services to AWS storage; examples: connects an on-premises software apps with cloud-based storage, securely upload data to AWS Cloud, backup data on the AWS, mirror on-premises data
  * AWS Import/Export Snowball - petabyte-scale data transport to/from AWS, low cost, secured with encryption
    * use cases
      * cloud migration
      * DR
      * Data Center decomission
      * Content Distribution
  * Amazon CloudFront - global CDN that integrates with other Amazon services
    * can deliver static / dynamic / streaming and interactive content
    * delivers content using global network of edge locations
    * no long term contract commitment

* Database
  * Amazon Relational Database (RDS) - managed relational database service; available: MySQL, Oracle, Postgres, MsSQL
  * Amazon RDS For Aurora - newest MySQL compatibile relational DB engine
  * Amazon DynamoDB - managed NoSQL DB service
  * Amazon ElastiCache - in-memory caching service
  * Amazon Database Migration Service (DMS) - allows securelly migrate data to and from supportd DBs
    * supports homogenous migrations like Orale -> Oracle
    * supports heterogenous migrations like Postgres -> Oracle
    * stream data from supported sources to Redshift

* Networking
  * Amazon VPC - private, isolated section of the AWS cloud; define private and public networks and control inbound and outbound traffic
    * control over
      * ip address range
      * public and private subnets
      * network topologies
      * route table and network gateway config
      * control access using NACLs and Security Groups
    * connect VPC to your IT infrastructure with encrypted VPN connection
    * attach an Elastic IP adress - make resources internet accessible
  * AWS Direct Connect - private connectivity between AWS and your data center
  * Amazon Route 53 - DNS web service

* Security & Identify
  * AWS IAM - manage users, groups, permissions
    * create individual users
    * manage permissions with groups
    * configure a strong password policy
    * enable multifactor authentication (MFA) for priviliged users
    * use IAM roles for EC2 instances, to share access
    * rotate security credentials regularly
    * restrict priviliged access further with conditions
  * AWS Dirrectory Service - connecting existing on premises MS Directory
  * AWS CloudHSM - dedicated hardware security module appliances
  * AWS WAF - web app firewall

* Monitoring and Usage Auditing
  * Amazon CloudWatch - monitor system and custom resources, metrics, displays graphs
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
  * AWS CloudFormation - templates in JSON format to deploy and manage; allows to create a collection of related AWS resources and provision them in an orderly and predictible fashion as a templates
  * AWS Trusted Advisor - helps further reducing costs by inspecting AWS environment and recommends opportunities or eliminates unused and idle resources, provides guidences in the realtime
    * recomendations in the categories
      * cost optimization
      * performance
      * security
      * fault tolerance

* Mobile Services
  * Amazon Cognito - Amazon Cognito is a simple user identity and data synchronization service that helps you securely manage and synchronize app data for your users across their mobile devices.
  * AWS Device Farm - helps you improve the quality of your Android, Fire OS, and iOS apps by testing them against real phones and tablets in the AWS Cloud.

* Enterprise Applications
  * Amazon WorkSpaces - is a fully managed virtual desktop service in the cloud with strong administrative controls and feedback capabilities.
  * Amazon WorkDocs - is a fully managed, secure enterprise storage and sharing service with strong administrative controls and feedback capabilities that improve user productivity.
  * Amazon WorkMail - is a managed email and calendaring service that offers strong security controls and support for existing desktop and mobile clients.

# Resources

* https://www.cheatography.com/nire0510/cheat-sheets/aws-services/#downloads
