---
title: Java Datasource
---

As a developer, you need not know details about how to connect to the database; that is the responsibility of the administrator that sets up the datasource. You most likely fill both roles as you develop and test code, but you do not necessarily have to know how the production data source is configured.

When using Spring`s JDBC layer, you obtain a data source from JNDI or you configure your own with a connection pool implementation provided by a third party. Popular implementations are Apache Jakarta Commons DBCP and C3P0. Implementations in the Spring distribution are meant only for testing purposes and do not provide pooling.

# Datasources

## DriverManagerDataSource

For development purposes only!

Maven dependency:

```xml
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-jdbc</artifactId>
	<version>...</version>
</dependency>
```

Spring config:

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

## C3P0

Maven dependency:

```xml
<dependency>
	<groupId>com.mchange</groupId>
	<artifactId>c3p0</artifactId>
	<version>...</version>
</dependency>
```

Spring config:

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
    <property name="driverClass" value="${jdbc.driverClassName}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

## DBCP

Maven dependency:

```xml
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-dbcp2</artifactId>
	<version>...</version>
</dependency>
```

Spring config:

```xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

## BoneCP

Maven dependency:

```xml
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-dbcp2</artifactId>
	<version>...</version>
</dependency>
```

Spring config:

```xml
<bean id="mainDataSource" class="com.jolbox.bonecp.BoneCPDataSource" destroy-method="close">
   <property name="driverClass" value="${jdbc.driverClassName}" />
   <property name="jdbcUrl" value="${jdbc.url}" />
   <property name="username" value="${jdbc.username}"/>
   <property name="password" value="${jdbc.password}"/>
</bean>
```

## Container managed datasource

**Using ```jee``` schema**

```xml
<xmlns:jee="http://www.springframework.org/schema/jee"
xsi:schemaLocation="http://www.springframework.org/schema/jee 
                    http://www.springframework.org/schema/jee/spring-jee-3.2.xsd">
...
<jee:jndi-lookup id="dbDataSource"
   jndi-name="jdbc/DatabaseName"
   expected-type="javax.sql.DataSource" />
```

**Using bean**

```xml
<bean id="dbDataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:comp/env/jdbc/DatabaseName"/>
</bean>
```

**Example datasource configuration on Tomcat**

You can declare the JNDI resource in tomcat's server.xml using something like this:

```xml
<GlobalNamingResources>
  <Resource name="jdbc/DatabaseName" auth="Container" type="javax.sql.DataSource"
              username="dbUsername" password="dbPasswd"
              url="jdbc:postgresql://localhost/dbname"
              driverClassName="org.postgresql.Driver"
              initialSize="5" maxWait="5000"
              maxActive="120" maxIdle="5"
              validationQuery="select 1"
              poolPreparedStatements="true"/>
</GlobalNamingResources>
```

And reference the JNDI resource from Tomcat's web context.xml like this:

```xml
  <ResourceLink name="jdbc/DatabaseName"
   global="jdbc/DatabaseName"
   type="javax.sql.DataSource"/>
```

# Drivers

## MySQL

* Dependency:

```xml
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>5.1.9</version>
	</dependency>
```

* Driver: ```com.mysql.jdbc.Driver```
* URL: ```jdbc:mysql://localhost:3306/databaseName```
* Hibernate dialect: ```org.hibernate.dialect.H2Dialect```

## H2

* Dependency:

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <version>1.1.102</version>
</dependency>
```

* Driver: ```org.h2.Driver```
* Datasource: ```org.h2.jdbcx.JdbcDataSource```
* URL: ```jdbc:h2:path\databaseName```
* Hibernate dialect: ```org.hibernate.dialect.H2Dialect```

## Derby

* Dependency:

```xml
<dependency>
  <groupId>org.apache.derby</groupId>
  <artifactId>derbyclient</artifactId>
  <version>10.9.1.0</version>
  <type>jar</type>
</dependency>
```

* Driver: ```org.apache.derby.jdbc.ClientDriver```
* URL: ```jdbc:derby://localhost:1527/databaseName;create=true```
* Hibernate dialect: ```org.hibernate.dialect.DerbyDialect```

## Postgres

* Server configuration:

    * Download server in zip from [http://www.postgresql.org/](http://www.postgresql.org/)
    * Extract it to `opt` dir
    * Init database: `./bin/initdb.exe -D /home/username/jpa-db`
    * Run server: `"./bin/postgres" -D "/home/username/jpa-db"`

* Dependency:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>9.2-1002-jdbc4</version>
</dependency>
```

* Driver: ```org.postgresql.Driver```
* URL: ```jdbc:postgresql://localhost:5433/postgres```
* Hibernate dialect: ```org.hibernate.dialect.PostgreSQLDialect```