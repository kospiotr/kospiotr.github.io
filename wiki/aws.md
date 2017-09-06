---
layout: wiki
title: AWS
comments: false
toc: false
editurl: wiki/aws.md
---

Products

* Compute
  * Amazon EC2 - web service providing resizable compute capacity
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
  * Amazon Elastic MapReduce - process large amounts of data, uses Hadoop
  * Amazon Kinesis - real-time data stream processing
  * Amazon QuickSight - SPICE (superfast, parallel, in-memory, calculation, engine)
  
* Application Services

* Management Services

* Mobile Services

* Enterprise Applications
