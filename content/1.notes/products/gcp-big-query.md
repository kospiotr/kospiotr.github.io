---
title: BigQuery
---

# BigQuery

## Processing Big Data with BigQuery

### Understanding the Use Case
- Data Collection 
- Data Governance
- Data usage policy

### Data Storage
- Storage capacity
- Security
- Scalability
- Redundancy / Backup / Recovery
- 
### Data Exploration
- Data schema
- Data format
- Changes over time

### Data analytics
- Processing engine
- Service availability
- Output of the analysis

## Big Query overview
- OLAP not OLTP
- Big data > 1TB, otherwise use regular DB.
- Structured data, otherwise use Data Lake
- Serverless and fully managed
- Caches queries
- Prices: on-demand, reservations, Flex slots, Flat rate


## BigQuery Architecture
- Servers
- Borg - Platform for containers
- Colossus - Splits data for parallel processing
- Jupiter - Ultra fast Network
- Dremel - Query Execution Engine
- API