---
title: SCWD
---

# Overview
**Slowly Changing Dimensions (SCD)** are a key concept in data warehousing, used to manage and track changes to data over time. In dimensional modeling, particularly for star and snowflake schemas, it's common for dimensions (such as customers, products, or locations) to change slowly over time. Managing these changes ensures historical accuracy and supports analytical queries.

There are several types of SCD, each representing a different method of handling changes in the dimension data. Let's explore the main types with examples.

- - -

# SCD Type 0: Fixed Dimension

This is where the data in a dimension does **not change** after its initial load. It's rarely used, but sometimes dimensions like product codes or immutable attributes (e.g., date of birth) can be modeled this way.

*   **No updates** to existing records are allowed. Once data is loaded into the dimension, it remains **immutable**.
*   The ETL process **only inserts new records** where the business key (`product_id`) does not already exist in the target table.
*   Any changes in the source data for existing records are **ignored**, ensuring data immutability.

**Example**:
*   Source Table: Source\_Product:

| product\_id | product\_name | category | price |
| --- | --- | --- | --- |
| 101 | Laptop | Electronics | 1500 |
| 102 | Smartphone | Electronics | 800 |

* ETL:
```SQL
    INSERT INTO Dim_Product (product_id, product_name, category, price, load_datetime) 
    SELECT s.product_id, s.product_name, s.category, s.price, CURRENT_TIMESTAMP 
    FROM Source_Product s 
    WHERE s.product_id NOT IN (SELECT product_id FROM Dim_Product);
```

* Target Table: Dim\_Product:

| product\_id | product\_name | category | price | load\_datetime |
| --- | --- | --- | --- | --- |
| 101 | Laptop | Electronics | 1500 | 2024-01-01 08:00:00 |
| 102 | Smartphone | Electronics | 800 | 2024-01-01 08:00:00 |



# SCD Type 1: Overwrite

The **current value** of an attribute is simply overwritten when it changes. No historical data is kept, so you only see the latest information.

*   **Historical data is not preserved**. The latest data always overwrites the existing data.
*   The ETL process **updates existing records** with changes from the source.
*   New records from the source are **inserted** into the target table.
*   This type is typically used when only the current data is required, and historical data is not important.

**Example: new record**:
*   Source Table: Source\_Product:

| product\_id | product\_name | category | price |
| --- | --- | --- | --- |
| 101 | Laptop | Electronics | 1500 |
| 102 | Smartphone | Electronics | 800 |

* ETL:
```SQL
INSERT INTO Dim_Product (product_id, product_name, category, price, last_updated_datetime) 
SELECT s.product_id, s.product_name, s.category, s.price, CURRENT_TIMESTAMP 
FROM Source_Product s 
WHERE s.product_id NOT IN (SELECT product_id FROM Dim_Product);
```

* Target Table: Dim\_Product:

| product\_id | product\_name | category | price | last\_updated\_datetime |
  | --- | --- | --- | --- | --- |
| 101 | Laptop | Electronics | 1500 | 2024-01-01 08:00:00 |
| 102 | Smartphone | Electronics | 800 | 2024-01-01 08:00:00 |


**Example: update record**:
*   Source Table: Source\_Product:

| product\_id | product\_name | category | price |
| --- | --- | --- | --- |
| 101 | Laptop Pro | Electronics | 1600 |
| 102 | Smartphone | Electronics | 800 |
| 103 | Tablet | Electronics | 900 |

* ETL:
```SQL
UPDATE 
    Dim_Product SET product_name = s.product_name,     
    category = s.category,     
    price = s.price,     
    last_updated_datetime = CURRENT_TIMESTAMP 
FROM Source_Product s 
WHERE Dim_Product.product_id = s.product_id;
```

* Target Table: Dim\_Product:

| product\_id | product\_name | category | price | last\_updated\_datetime |
| --- | --- | --- | --- | --- |
| 101 | Laptop Pro | Electronics | 1600 | 2024-10-03 11:30:00 |
| 102 | Smartphone | Electronics | 800 | 2024-01-01 08:00:00 |
| 103 | Tablet | Electronics | 900 | 2024-10-03 11:30:00 |

# SCD Type 2: Add New Row (Historical Tracking)

When an attribute changes, a **new row** is added with the updated information, and the old row is marked as "inactive" (or with a validity date). This allows tracking of historical data.

*   **Historical changes are preserved** by inserting new rows for any changes in the source data.
*   The previous record is marked as inactive by updating the `end_date` and `current_flag`.
*   A new row is inserted with the updated data and flagged as the current version.
*   This type is used when you need to maintain full historical data for the dimension (e.g., tracking changes in product prices, employee status, or customer addresses).

*   **Example**: A **Customer** dimension where the customer’s address changes, and we want to keep track of both the old and new addresses.
    *   Original Record:

        | Customer ID | Name | Address | Start Date | End Date |
                | --- | --- | --- | --- | --- |
        | 1   | John Doe | 123 Main St | 2020-01-01 | NULL |

    *   If John moves:
        *   Updated Records: | Customer ID | Name | Address | Start Date | End Date | |-------------|-----------|-------------|------------|-----------| | 1 | John Doe | 123 Main St | 2020-01-01 | 2024-09-30| | 1 | John Doe | 456 Oak St | 2024-10-01 | NULL |
    *   The `End Date` of the previous row is updated to indicate that the record is no longer valid.

- - -

# **SCD Type 3: Add New Column (Limited Historical Tracking)**

**Description**: A **new column** is added to store both the current and previous value of the changing attribute. This method tracks a limited history since only one previous value is retained.

*   **Example**: A **Customer** dimension table where the customer’s address changes and you only track the current and previous addresses.
    *   Original Record:

        | Customer ID | Name | Current Address | Previous Address |
                | --- | --- | --- | --- |
        | 1   | John Doe | 123 Main St | NULL |

    *   If John moves:
        *   Updated Record: | Customer ID | Name | Current Address | Previous Address | |-------------|-----------|-----------------|------------------| | 1 | John Doe | 456 Oak St | 123 Main St |
    *   In this case, the table now holds **both the current and previous addresses**, but no further history beyond that.

- - -

# **SCD Type 4: Add Historical Table**

**Description**: The historical data is moved to a **separate historical table** that keeps track of changes, while the current table only holds the latest data.

*   **Example**: A **Customer** dimension table with an associated **Customer History** table that keeps historical records.
    *   **Current Table (Customer)**:

        | Customer ID | Name | Address |
                | --- | --- | --- |
        | 1   | John Doe | 456 Oak St |

    *   **Historical Table (Customer\_History)**:

        | Customer ID | Name | Address | Start Date | End Date |
                | --- | --- | --- | --- | --- |
        | 1   | John Doe | 123 Main St | 2020-01-01 | 2024-09-30 |

    *   This approach keeps the current and historical data **separated** into different tables.

- - -

# **SCD Type 6: Hybrid (SCD 1 + SCD 2 + SCD 3)**

**Description**: This type is a **hybrid** approach that combines the features of SCD Type 1, Type 2, and Type 3. It involves:

1.  **Overwriting** the current data in the dimension (SCD Type 1).
2.  **Keeping a separate row for history** (SCD Type 2).
3.  **Maintaining a previous value column** (SCD Type 3).

*   **Example**: A **Customer** dimension where we track changes to the address, and keep the previous and current values, while also maintaining a historical record.
    *   **Hybrid SCD Table**:

        | Customer ID | Name | Current Address | Previous Address | Start Date | End Date |
        | --- | --- | --- | --- | --- | ---    |
        | 1   | John Doe | 456 Oak St | 123 Main St | 2024-10-01 | NULL |

    *   Historical tracking is maintained, and both the current and previous values are available.

- - -

# **Conclusion:**

Each **SCD type** offers a different way to manage changes in dimension data:

*   **Type 0** is static (no changes allowed).
*   **Type 1** simply overwrites the old value.
*   **Type 2** creates a new row, tracking changes over time.
*   **Type 3** adds a new column to store the previous value.
*   **Type 4** separates current and historical data into different tables.
*   **Type 6** combines elements of Type 1, Type 2, and Type 3 for flexible historical tracking.

The choice of SCD type depends on the business requirements, especially whether or not you need to retain historical information, and how much history you want to track.