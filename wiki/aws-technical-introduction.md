---
layout: wiki
title: AWS Technical - introduction to AWS
comments: false
toc: false
editurl: wiki/aws-technical-introduction.md
---

* AWS and Cloud Computing
  * What is it (keywords)
    * on-demand
    * IT resources
    * Accesible on-line
    * pay as you go
  * Benefits
    * Low cost
    * Elastic
    * Flexible
    * Secure
  * AWS vs On-Premise
    * No capital expenses / initial purchases:
      * install and config
      * physical space, cooling, power
      * cabling, networking, racks, servers, storage
      * labor certification, ...
    * Click to order resources
    * Immediate access - fast on-demand provisioning
    * Continually lower prices
    * Optimizing costs with pricing options
    * Can focus on app than on DevOps
    * Flexible resource capacity
    * Global reach on-demand
* AWS Infrastructure
  * Regions - geographic area with two or more AZs, they are completely separated from each other and resources are not automatically replicated between them; communication between them is done over public Internet so additional costs can appear and need to apply some secured channel
  * Availibility Zones - is a collection of data centers within each region, isolated from other AZs; connected by low latency links
    * isolationg AZs protects each other from failures in other AZs
    * low latency links make it possible for another AZs to handle requests of another AZs
