---
layout: wiki
title: MySQL
comments: false
toc: false
editurl: wiki/mysql.md
---

# Basic commands

Create database with user:

```
CREATE SCHEMA `petshop` DEFAULT CHARACTER SET utf8;

CREATE USER `petshop-dml` identified by 'petshop-dml123';

GRANT SELECT ON petshop.* TO `petshop-dml`;
GRANT INSERT ON petshop.* TO `petshop-dml`;
GRANT UPDATE ON petshop.* TO `petshop-dml`;
GRANT DELETE ON petshop.* TO `petshop-dml`;
GRANT EXECUTE ON petshop.* TO `petshop-dml`;

//optionally create your own user, that executes DDLs:
//CREATE USER `petshop-admin` identified by 'petshop-admin123';
//GRANT ALL PRIVILEGES ON *.* TO `petshop-admin`@'%';
```

Create database:

```
CREATE SCHEMA TDB_dev
  CHARACTER SET utf8
  COLLATE utf8_bin;

CREATE SCHEMA TDB_prod
  CHARACTER SET utf8
  COLLATE utf8_bin;
```
