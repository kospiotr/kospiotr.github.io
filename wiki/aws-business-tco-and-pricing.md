---
layout: wiki
title: AWS Business - TCO and pricing
comments: false
toc: false
editurl: wiki/aws-business-tco-and-pricing.md
---

* Total Cost of Ownership (TCO) - showing parters and ownerships why AWS cost model another is better than other options like on-premises, virtualised or colocations and makes sure that best practices are followed
* How can you achieve lower TCO with AWS
  * replace large upfront expeduries with pay as you go and only for what you use
  * pricing model choice to support variable & stable workloads; on-demand reserved spot
  * save more money as you grow bigger - tired pricing, volume discounts, custom pricing
* TCO Analysis - is typically used for comparising costs of:
  * on premise or colocation solution vs AWS
  * specific workload vs AWS
* TCO Methodology
  * Typical Data Center Cost Models:
    * Software & Hardware Cost Model
      * Software Costs: OS, hypervisor, data center management software, software maintenance
      * Hardware Costs: equipment cost (servers, storage, network) hardware maintenance
      * IT Admin Costs: virtualisation admin, system admin, storage admin, network admin, security admin, data center admin
      * Facility Costs: building cost, maintenance, taxes, security staff, facilities staff, power cost, cooling cost
    * Server, Storage, & Network Cost Model
      * Server Costs: server hardware + maintenance server software + maintenance (OS virtualisation)
      * Storage Costs: storage infrastructure (SAN switches, disk) + maintenance storage admin
      * Network Costs: network infrastructure (LAN switches, WAN capacity) + maintenance network admin
      * IT Admin Costs: server admin virtualisation admin
      * Facility Costs: building cost, maintenance, taxes, security staff, facilities staff, power cost, cooling cost
* AWS Pricing Principles
  * No up-front investment - AWS helps customers replace up-front capital expense or ‘CapEx’ with low variable operational cost or ‘OpEx.’
  * Pay per use
  * Pay as you go - no minimum commitments are required
  * Services priced independently - each AWS service is priced independently. This strategy allows customers to choose the services that they need for each project, and to pay only for what they use.
  * Volume pricing discounts - for storage and data transfer, pricing is tiered. The more resources that are used, the less customers pay per gigabyte.
  * Reserved instance discounts - for certain products, customers can invest in reserved capacity. In other words, they pay a one-time low upfront fee, and their on-demand rate is reduced by 28 to 62 percent.
* AWS Free Tier: https://aws.amazon.com/free/
* AWS Trusted Advisor - helps further reducing costs by inspecting AWS environment and recommends opportunities or eliminates unused and idle resources
* Fundamental Cost Characteristics
  * Compute (EC2)
  * Storage (EC3)
  * Data Transfer out (EBS)
* EC2 pricing
  * Compute
    * Instance type / hour
    * Amazon EC2 purchase options
    * Network I/O
  * Storage
    * Allocated Volume storage - charged by provisions amount 
    * Snapshot storage - charged by the data space that S3 consumes; for the first snapshot and incremental one
    * Volume I/O
  * Other costs
    * Load Balancing - charged for each or partial hour ELB is running and each gigabyte of data transferred through ELB
    * Detailed Monitoring
    * Auto Scaling
    * Elastic IP Addresses
    * Operation Systems and Software packages
    
  Can be combined with other purchase types, like Reserved Instances
* S3 pricing
  * Storage class - Standard storage, Reduced Redundancy storage, Glacier storage
  * Storage - Number of TB / month
  * Requests - Pricing per 1,000 requests (Put, Copy, Post, List). Pricing per 10,000 requests (Get). Delete and Glacier Restores are free.
  * Data transfer - Pricing is based on data transferred "in" to and "out" of Amazon S3.
  * Standard – Infrequent Access: Same durability as Standard, however with reduced availability. 
* Amazon RDS pricing
  * Database (DB) instance classes and purchasing options
  * Allocated storage
  * Database Type (DB license)
* Data Transfer Costs
  * data transfer out
  * data transfer in
  * cross AZ data transfer
  * inner AZ data transfer
  
  The outbound data transfer is aggregated across Amazon EC2, Amazon S3, Amazon RDS, Amazon DynamoDB, Amazon SQS, Amazon SNS, and Amazon VPC, and then charged at the outbound data transfer rate. This charge appears on the monthly statement as AWS Data Transfer Out.
* Amazon CloudFront pricing
  * Traffic distribution
  * Requests
  * Data transfer out
  
