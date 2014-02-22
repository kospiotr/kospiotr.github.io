---
layout: wiki
title: DB connectors
comments: false
toc: true
---
#Links

 * https://code.google.com/p/xperios/wiki/JPA

#H2
 * Dependency

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <version>1.1.102</version>
</dependency>
```

 * Driver

```java
org.h2.Driver
org.h2.jdbcx.JdbcDataSource //for JNDI
```

 * URL

```
jdbc:h2:path\databaseName
```

 * Hibernate dialect:

```
org.hibernate.dialect.H2Dialect
```

#Derby

##Network

 * Dependency

```xml
<dependency>
  <groupId>org.apache.derby</groupId>
  <artifactId>derbyclient</artifactId>
  <version>10.9.1.0</version>
  <type>jar</type>
</dependency>
```

 * Driver

```
org.apache.derby.jdbc.ClientDriver
```

 * URL

##Embeded
