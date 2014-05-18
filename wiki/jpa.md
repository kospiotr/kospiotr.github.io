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
### Bidirectional
#### No owning side

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
![JEE]({{page.res}}/one-with-many-bi-1.png)
</center>
#### Employee owning side

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
![JEE]({{page.res}}/one-with-many-bi-2.png)
</center>


##OneToMany
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
![JEE]({{page.res}}/many-to-many-bi-1.png)
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
![JEE]({{page.res}}/many-to-many-bi-2.png)
</center>