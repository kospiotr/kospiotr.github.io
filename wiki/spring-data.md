---
layout: wiki
title: Spring Framework Data
comments: false
toc: true
editurl: wiki/spring-framework-data.md
res: ../resources/wiki/spring
slideshow: true
---

# Configuration

**Dependencies**

Add Spring dependencies in ```pom.xml``` :

```xml
<properties>
    ...
    <hibernate.version>4.1.9.Final</hibernate.version>
</properties>

<dependencies>
    ...
    <!-- Spring -->
    ...
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-orm</artifactId>
        <version>${spring.version}</version>
    </dependency>

    <!-- JPA Vendor -->
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-entitymanager</artifactId>
        <version>${hibernate.version}</version>
    </dependency>
</dependencies>
```

**Install and configure database**

* Database type: MySQL
* Host: localhost
* Port: ```3306```
* Database: hello_spring
* Login: root
* Password: root

**Configure MySQL Driver**

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.22</version>
</dependency>
```

**Configure Datasource in Spring**

For development purposes:

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/hello_spring"/>
    <property name="username" value="root"/>
    <property name="password" value="root"/>
</bean>
```

For more datasources possibilities check: [Datasources](/wiki/datasources.html)

**Configure local Transaction Manager**

```xml
<!-- Transactions -->
<bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
    <property name="entityManagerFactory" ref="entityManagerFactory" />
</bean>
<!-- enable the configuration of transactional behavior based on annotations -->
<tx:annotation-driven transaction-manager="transactionManager" />
```

**Option 1: Configure EntityManager without persistence.xml**

```xml
<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
    <property name="jpaVendorAdapter">
        <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
            <property name="generateDdl" value="true" />
            <property name="showSql" value="true" />
        </bean>
    </property>
    <property name"packagesToScan value="io.github.kospiotr.model"/>
    <property name="dataSource" ref="dataSource"/>
</bean>
```

**Option 2: Configure EntityManager with persistence.xml**

```xml
<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
    <property name="jpaVendorAdapter">
        <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter"/>
    </property>
    <property name="dataSource" ref="dataSource"/>
</bean>
```

Then ```META-INF/persistence.xml```:

```xml
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/persistence 
             http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
             version="2.0">
    <persistence-unit name="PU" transaction-type="RESOURCE_LOCAL">
        <properties>
            <property name="hibernate.show_sql" value="true"/>
            <property name="hibernate.format_sql" value="true"/>
            <property name="hibernate.hbm2ddl.auto" value="create-drop"/>
        </properties>
    </persistence-unit>
</persistence>
```

More configuration properties: https://docs.jboss.org/hibernate/core/4.3/manual/en-US/html_single#configuration-optional

# What is it for?

Simplify JPA access by removing boilerplate code and introduce higher level of abstraction. Thanks to Spring Data we can focus on business value.

# Example Model

## Java model

```java
import javax.persistence.Entity;
import javax.persistence.Id;
 
@Entity
public class Product {
 
    @Id
    private Integer id;
    private String name;
 
    public Product() {
    }
 
    public Product(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
 
    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + "]";
    }
 
}
```
# Pure JPA CRUD example

**DAO**

```java
@Component
public class ProductDao {
 
    @PersistenceContext
    private EntityManager em;
 
    public void persist(Product product) {
        em.persist(product);
    }
 
    public List<Product> findAll() {
        return em.createQuery("SELECT p FROM Product p").getResultList();
    }
 
}
```

**Service**

```java
@Component
public class ProductService {
 
    @Autowired
    private ProductDao productDao;
 
    @Transactional
    public void add(Product product) {
        productDao.persist(product);
    }
     
    @Transactional
    public void addAll(Collection<Product> products) {
        for (Product product : products) {
            productDao.persist(product);
        }
    }
 
    @Transactional(readOnly = true)
    public List<Product> listAll() {
        return productDao.findAll();
 
    }
 
}
```