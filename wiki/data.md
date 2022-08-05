---
layout: wiki
title: Data
comments: false
toc: true
editurl: wiki/data.md
---

# Glossary
## Data Warehouse
Hierarchical DW - stores data in files or folders. Uses proprietary systems.
## DataLake (Databrics propertary)
Repositories for raw data in a variety of formats (structured, unstructuured, from audio, video, xml, csv, avro, parquet, compressed, chunked, from bytes to GBs). It is represented mostly as a storage but sometimes as an architecture (Kappa, Lambda, Delta) with processing segments (ETL or sometimes ELT) pipelines in place.
Uses object storage, flat locations, tags, metadata, unique ID for performance improvements. Schema on read. Unstructured data support - good for ML. .
Examples: HDFS, GCS, S3
Pros:
- Uses cheap storage, open formats
- Highly durable, low costs, scalable
- ML friendly
Cons:
- Don't support transactions 
- No data check, quality, consistency
Good for:
- Powering data science and machine learning
- Centralization, consolidation, cataloging data
- 
## Lakehouse
## Datamesh
## Data Pipeline
## MPP
## BigData
## Analytics
### KPI Dashboard
High level, strategic goals of the organization, and we need to figure out what data we want to use in order to make a decision makers to understand how well we are doing aganst those goals and how well as a business we are performing. What data is 
### Self service

# History

# Tags
flexibility, performance, costs, ingestion, governance, policies, master data management, lineage, real time processing, streaming, messaging, volumes, formats, consistency, isolation, refinement, raw, intermediate, final, bronze, silver, gold, segmentation



# Data pipeline
## Analogy to water pipelines
Fetching data from lakes, rivers and ponds could take long distances and time. It was manual process but in time the demand was bigger and the water supply has been automated with the new technologies.
Basics
Data pipeline is a mechanism to transfer data from point A to point B through some intermediate points C,D and E where data processing takes place.
Data pipeline receives data from the Data Producers and the result of the processing is used by the Data Consumers.

## Responsibilities
Ingestion
Data Governance
Master Data Management
Lineage

## Segmentation
Bronze / Silver / Gold
Data format
Security

## Usage
Data Pipelines are used in the following fields:
Business Analytics
Reporting
Data Science
Machine Learning

## Types of the Data Pipelines
ETL, ELT, CDA
Batch, Realtime

## Architectures
Kappa, Delta, Lambda
Storage
Raw

Silver
Gold

# Tools
SAP BODS
Kafka
