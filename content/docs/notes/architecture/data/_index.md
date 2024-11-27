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



# Normalisation

### **Database Normal Forms**
Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. Normal forms are a series of rules applied to database tables to ensure consistency and efficiency.

---

### **1st Normal Form (1NF): Eliminate Repeating Groups**
**Principle**: Each column should hold atomic (indivisible) values, and there should be no repeating groups or arrays within a table. Each row must be unique.

- **Good Example**:
  | OrderID | Product    | Quantity |
  |---------|------------|----------|
  | 1       | Apple      | 10       |
  | 1       | Banana     | 5        |
  | 2       | Orange     | 3        |

- **Bad Example** (Repeating groups):
  | OrderID | Product1 | Quantity1 | Product2 | Quantity2 |
  |---------|----------|-----------|----------|-----------|
  | 1       | Apple    | 10        | Banana   | 5         |

**Issue**: Difficult to query and maintain as the number of products grows.

---

### **2nd Normal Form (2NF): Eliminate Partial Dependencies**
**Principle**: Ensure that every non-key column is fully dependent on the whole primary key (for composite keys). Tables with a single-column primary key are automatically in 2NF if they meet 1NF.

- **Good Example**:
  **Orders Table**:
  | OrderID | CustomerID |
  |---------|------------|
  | 1       | 101        |
  | 2       | 102        |

  **OrderDetails Table**:
  | OrderID | ProductID | Quantity |
  |---------|-----------|----------|
  | 1       | 201       | 10       |
  | 1       | 202       | 5        |

- **Bad Example**:
  | OrderID | CustomerID | ProductID | Quantity |
  |---------|------------|-----------|----------|
  | 1       | 101        | 201       | 10       |
  | 1       | 101        | 202       | 5        |

**Issue**: "CustomerID" depends only on `OrderID`, not the combination of `OrderID` and `ProductID`. This creates redundancy.

---

### **3rd Normal Form (3NF): Eliminate Transitive Dependencies**
**Principle**: Ensure that non-key columns are only dependent on the primary key, not on other non-key columns.

- **Good Example**:
  **Orders Table**:
  | OrderID | CustomerID | OrderDate |
  |---------|------------|-----------|
  | 1       | 101        | 2024-11-25|

  **Customers Table**:
  | CustomerID | CustomerName |
  |------------|--------------|
  | 101        | John Doe     |

- **Bad Example**:
  | OrderID | CustomerID | CustomerName |
  |---------|------------|--------------|
  | 1       | 101        | John Doe     |
  | 2       | 101        | John Doe     |

**Issue**: "CustomerName" depends on `CustomerID`, not directly on `OrderID`, leading to redundancy and maintenance problems.

---

### **Boyce-Codd Normal Form (BCNF): Generalization of 3NF**
**Principle**: Every determinant (column or combination of columns that uniquely identify another column) must be a candidate key.

- **Good Example**:
  **Rooms Table**:
  | RoomID | RoomType | PricePerNight |
  |--------|----------|---------------|
  | 101    | Single   | 100           |
  | 102    | Double   | 150           |

- **Bad Example**:
  | RoomID | RoomType | Manager       |
  |--------|----------|---------------|
  | 101    | Single   | Alice         |
  | 102    | Double   | Bob           |

**Issue**: "RoomType" determines "Manager," but "RoomType" is not a candidate key (it’s not unique).

---

### **4th Normal Form (4NF): Eliminate Multi-Valued Dependencies**
**Principle**: A table should not have more than one multi-valued dependency. Multi-valued dependencies occur when one column can have multiple values independently of another.

- **Good Example**:
  **Courses Table**:
  | StudentID | CourseID |
  |-----------|----------|
  | 1         | Math     |
  | 1         | Science  |
  | 2         | Math     |

  **Hobbies Table**:
  | StudentID | Hobby    |
  |-----------|----------|
  | 1         | Painting |
  | 1         | Chess    |
  | 2         | Swimming |

- **Bad Example**:
  | StudentID | CourseID | Hobby      |
  |-----------|----------|------------|
  | 1         | Math     | Painting   |
  | 1         | Science  | Chess      |

**Issue**: Independent multi-valued facts (Courses and Hobbies) are combined, leading to redundancy.

---

### **5th Normal Form (5NF): Eliminate Join Dependencies**
**Principle**: A table is in 5NF if it cannot be decomposed into smaller tables without losing data.

- **Good Example**:
  **Suppliers Table**:
  | SupplierID | PartID |
  |------------|--------|
  | 1          | A      |
  | 1          | B      |
  | 2          | A      |

  **Projects Table**:
  | ProjectID | PartID |
  |-----------|--------|
  | X         | A      |
  | X         | B      |
  | Y         | A      |

- **Bad Example**:
  | SupplierID | PartID | ProjectID |
  |------------|--------|-----------|
  | 1          | A      | X         |
  | 1          | B      | X         |
  | 2          | A      | Y         |

**Issue**: Combining multiple relationships (Supplier-Part and Part-Project) creates redundancy.

---

### Summary of Normal Forms
| Normal Form | Key Principle                                     | Main Issue Resolved                    |
|-------------|---------------------------------------------------|----------------------------------------|
| **1NF**     | Atomic columns, no repeating groups              | Eliminates multi-value cells           |
| **2NF**     | No partial dependencies                          | Removes dependencies on part of key    |
| **3NF**     | No transitive dependencies                       | Removes non-key dependencies           |
| **BCNF**    | Every determinant is a candidate key             | Resolves key dependency violations     |
| **4NF**     | No multi-valued dependencies                     | Handles independent multi-values       |
| **5NF**     | No join dependencies                             | Prevents redundancy from complex joins |

Would you like more details on any specific normal form or practical implementation tips?

Refs:
- https://youtu.be/GFQaEYEc8_8?si=8v5hSBXxqwJE97_k
- https://youtu.be/SK4H5tTT6-M?si=stLjOO_iDI-Rsdnk