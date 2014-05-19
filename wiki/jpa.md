---
layout: wiki
title: JPA
comments: false
toc: true
description: Java Persistence API
editurl: wiki/jpa.md
res: ../resources/wiki/jpa
---


##Lazy loading
The default is to load all basic mappings eagerly

Example:

```java
 @Basic(fetch=FetchType.LAZY)
 @Column(name="COMM")
 private String comments;
```

##Large Objects
Annotation: `@Lob`

Two types:

* CLOB - character large objects (char[], Character[], and String)
* BLOB - binary large objects (byte[], Byte[] and Serializable types)

Example:

```java
@Entity
public class Employee {
 @Id
 private int id;
 @Basic(fetch=FetchType.LAZY)
 @Lob @Column(name="PIC")
 private byte[] picture;
 // ...
}
```

##Enumerated Types
By default Enumerated types are represented as number - an index of value in the enum class.
It is possible to change this behaviour by adding `@Enumerated` annotation with value:

* `EnumType.ORDINAL` - enum represented as enum value index
* `EnumType.STRING` - enum represented as String

Example:

```java
@Entity
public class Employee {
 @Id
 private int id;
 @Enumerated(EnumType.STRING)
 private EmployeeType type;
 // ...
}
```

##Temporal Types
Temporal types are the set of time-based types that can be used in persistent state mappings.
Supported formats:

* `java.sql.Date`
* `java.sql.Time`
* `java.sql.Timestamp`

Supported formats that needs extra annotation explaination:

* `java.util.Date`
* `java.util.Calendar`

An annotation `@Temporal` needs to explain what specific kind of value it stores:

* `TemporalType.DATE`
* `TemporalType.TIME`

##Transient State
Attributes that are part of a persistent entity but not intended to be persistent can either be modified
with the `transient` modifier in Java or be annotated with the `@Transient` annotation.

#Relations

##OneToOne
###Unidirectional

The owning side is definied by `@OneToOne` annotation.

####Employee owning side

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;

    @OneToOne
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;

}
```

<center>
![JEE]({{page.res}}/one-to-one-4.png)
</center>

####Department owning side

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;
    @OneToOne
    Employee employee;

}
```

<center>
![JEE]({{page.res}}/one-to-one-5.png)
</center>


###Bidirectional

The inverse side is definied with mappedBy parameter in `@OneToOne` annotation.

####No owning side

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;

    @OneToOne
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;

    @OneToOne
    Employee employee;
}
```

<center>
![JEE]({{page.res}}/one-to-one-1.png)
</center>

####Employee owning side

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;

    @OneToOne
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;

    @OneToOne(mappedBy = "department")
    Employee employee;
}
```

<center>
![JEE]({{page.res}}/one-to-one-2.png)
</center>


####Department owning side

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;

    @OneToOne(mappedBy = "employee")
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;

    @OneToOne
    Employee employee;
}
```

<center>
![JEE]({{page.res}}/one-to-one-3.png)
</center>



## ManyToOne and OneToMany
The one-to-many association is almost always bidirectional and never the owning side.
The only difference between the many-to-one and this one is that we are now implementing the inverse side of the relationship.

There are two important points to remember when defining bidirectional one-to-many (or many-to-one) relationships:

* The many-to-one side is the owning side, so the join column is defined on that side.
* The one-to-many mapping is the inverse side, so the mappedBy element must be used.

Failing to specify the `mappedBy` element in the @OneToMany annotation will cause the provider to treat it as a unidirectional one-to-many relationship that is defined to use a join table (described later). This is an easy mistake to make and should be the first thing you look for if you see a missing table error with a name that has two entity names concatenated together.


### Unidirectional
#### Employee owning side with annotation on Employee side


```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;
    @ManyToOne
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;

}
```

<center>
![JEE]({{page.res}}/one-with-many-4.png)
</center>



#### Employee owning side with annotation on Department side (wrong)

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;
    @OneToMany
    List<Employee> employee;

}
```

<center>
![JEE]({{page.res}}/one-with-many-5.png)
</center>


### Bidirectional

#### Employee owning side without mappingBy attribute (wrong)

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;
    @ManyToOne
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;
    @OneToMany
    List<Employee> employee;

}
```

<center>
![JEE]({{page.res}}/one-with-many-1.png)
</center>


#### Employee owning side with mappingBy attribute

```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;
    @ManyToOne
    Department department;

}
```

```java
@Entity
public class Department {

    @Id
    Long id;
    String name;
    @OneToMany(mappedBy = "department")
    List<Employee> employee;

}
```

<center>
![JEE]({{page.res}}/one-with-many-2.png)
</center>


##ManyToMany

###Bidirectional
####Employee owning side
```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;

    @ManyToMany
    List<Department> department;

}
```


```java
@Entity
public class Department {

    @Id
    Long id;
    String name;

    @ManyToMany(mappedBy = "department")
    List<Employee> employee;
}
```
<center>
![JEE]({{page.res}}/many-to-many-1.png)
</center>

####Department owning side
```java
@Entity
public class Employee {

    @Id
    Long id;
    String name;

    @ManyToMany
    List<Department> department;

}
```


```java
@Entity
public class Department {

    @Id
    Long id;
    String name;

    @ManyToMany(mappedBy = "department")
    List<Employee> employee;
}
```
<center>
![JEE]({{page.res}}/many-to-many-2.png)
</center>

#Collection Mapping