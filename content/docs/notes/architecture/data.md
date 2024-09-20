---
title: Data
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

# Concepts
## ETL
Extract Transform Load

Pros:
- Easy to test
- Unstructured data / schema in runtime
- Low cost storage
- Very flexible
- Good for data streaming

Cons:
- Poor performance
- High Cost
- Data move (network overhead)

## ELT

Pros:
- Good performance
- Costs optimized for compute

Cons:
- Only table data
- Storage can be expensive
- Only batch

## Fact Table
Example: Operation in time

## Dimension Table
Lookup table / dictionary. This might change (add / modify) often.
Example: Client Table

## Slowly Changing Dimension
It is a table which doesn't change very often.
Example: Country Table
Slowly Changing Dimension (SCD) is a dimension that stores and manages both current and historical data over the time in a data warehouse. 

### Type 0: Retain original
The Type 0 dimension attributes never change and are assigned to attributes that have durable values or are described as 'Original'. Examples: Date of Birth, Original Credit Score. Type 0 applies to most date dimension attributes.

### Type 1: Overwrite
This method overwrites old with new data, and therefore does not track historical data.

### Type 2: Add new row
This method tracks historical data by creating multiple records for a given natural key in the dimensional tables with separate surrogate keys and/or different version numbers. Unlimited history is preserved for each insert.

| Supplier_Key | Supplier_Code | Supplier_Name  | Supplier_State | Version |
|--------------|---------------|----------------|----------------|---------|
| 123          | ABC           | Acme Supply Co | CA             | 1       |
| 124          | ABC           | Acme Supply Co | IL             | 2       |
| 125          | ABC           | Acme Supply Co | NY             | 3       |

Another method is to add 'effective date' columns.

| Supplier_Key | Supplier_Code | Supplier_Name  | Supplier_State | Start Date          | End Date            |
|--------------|---------------|----------------|----------------|---------------------|---------------------|
| 123          | ABC           | Acme Supply Co | CA             | 2000-01-01T00:00:00 | 2004-12-22T00:00:00 |
| 124          | ABC           | Acme Supply Co | IL             | 2004-12-22T00:00:00 | Null                |

Another method is to add 'effective date' columns.

| Supplier_Key | Supplier_Code | Supplier_Name  | Supplier_State | Effective Date      | Current Flag |
|--------------|---------------|----------------|----------------|---------------------|--------------|
| 123          | ABC           | Acme Supply Co | CA             | 2000-01-01T00:00:00 | N            |
| 124          | ABC           | Acme Supply Co | IL             | 2004-12-22T00:00:00 | Y            |

### Type 3: Add new attribute

| Supplier_Key | Supplier_Code | Supplier_Name  | Original_Supplier_State | Effective Date      | Current_Supplier_State |
|--------------|---------------|----------------|-------------------------|---------------------|------------------------|
| 123          | ABC           | Acme Supply Co | CA                      | 2000-01-01T00:00:00 | NY                     |


### Type 4: Add history table

Supplier

| Supplier_Key | Supplier_Code | Supplier_Name  | Supplier_State |
|--------------|---------------|----------------|----------------|
| 125          | ABC           | Acme Supply Co | NY             |

Supplier History

| Supplier_Key | Supplier_Code | Supplier_Name  | Supplier_State | Create Date         |
|--------------|---------------|----------------|----------------|---------------------|
| 123          | ABC           | Acme Supply Co | CA             | 2003-06-14T00:00:00 |
| 124          | ABC           | Acme Supply Co | IL             | 2004-12-22T00:00:00 |

# Processing Big Data

## Understanding the Use Case
- Data Collection 
- Data Governance
- Data usage policy

## Data Storage
- Storage capacity
- Security
- Scalability
- Redundancy / Backup / Recovery
- 
## Data Exploration
- Data schema
- Data format
- Changes over time

# Data analytics
- Processing engine
- Service availability
- Output of the analysis
