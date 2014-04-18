---
layout: wiki
title: SQL
comments: false
editurl: wiki/sql.md
---

* `ALTER TABLE Orders ADD FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)` - add foreign key
* `ALTER TABLE Orders ADD CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)` - add named foreign key
