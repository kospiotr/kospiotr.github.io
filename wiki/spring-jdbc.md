---
layout: wiki
title: Spring JDBC
comments: false
toc: true
editurl: wiki/spring-framework-mvc.md
res: ../resources/wiki/spring
slideshow: true
---

# Configuration

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

For more datasources possibilities check: [Datasources](/wiki/data-sources.html)

# Example Model

**Java model**

```java
public class Employee {
 
    private int id;
    private String name;
    private String role;
     
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
     
    @Override
    public String toString(){
        return "{ID="+id+",Name="+name+",Role="+role+"}";
    }
}
```

**Database schema**

```sql
CREATE TABLE `Employee` (
  `id` int(11) unsigned NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

# Pure JDBC

```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
 
import javax.sql.DataSource;
 
public class EmployeeDAOImpl {
 
    private DataSource dataSource;

     public Employee getById(int id) {
         String query = "select name, role from Employee where id = ?";
         Employee emp = null;
         Connection con = null;
         PreparedStatement ps = null;
         ResultSet rs = null;
         try{
             con = dataSource.getConnection();
             ps = con.prepareStatement(query);
             ps.setInt(1, id);
             rs = ps.executeQuery();
             if(rs.next()){
                 emp = new Employee();
                 emp.setId(id);
                 emp.setName(rs.getString("name"));
                 emp.setRole(rs.getString("role"));
                 System.out.println("Employee Found::"+emp);
             }else{
                 System.out.println("No Employee found with id="+id);
             }
         }catch(SQLException e){
             e.printStackTrace();
         }finally{
             try {
                 rs.close();
                 ps.close();
                 con.close();
             } catch (SQLException e) {
                 e.printStackTrace();
             }
         }
         return emp;
     }

    public List<Employee> getAll() {
        String query = "select id, name, role from Employee";
        List<Employee> empList = new ArrayList<Employee>();
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{
            con = dataSource.getConnection();
            ps = con.prepareStatement(query);
            rs = ps.executeQuery();
            while(rs.next()){
                Employee emp = new Employee();
                emp.setId(rs.getInt("id"));
                emp.setName(rs.getString("name"));
                emp.setRole(rs.getString("role"));
                empList.add(emp);
            }
        }catch(SQLException e){
            e.printStackTrace();
        }finally{
            try {
                rs.close();
                ps.close();
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return empList;
    }

    public void create(Employee employee) {
        String query = "insert into Employee (id, name, role) values (?,?,?)";
        Connection con = null;
        PreparedStatement ps = null;
        try{
            con = dataSource.getConnection();
            ps = con.prepareStatement(query);
            ps.setInt(1, employee.getId());
            ps.setString(2, employee.getName());
            ps.setString(3, employee.getRole());
            int out = ps.executeUpdate();
            if(out !=0){
                System.out.println("Employee saved with id="+employee.getId());
            }else System.out.println("Employee save failed with id="+employee.getId());
        }catch(SQLException e){
            e.printStackTrace();
        }finally{
            try {
                ps.close();
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    } 
 
    public void update(Employee employee) {
        String query = "update Employee set name=?, role=? where id=?";
        Connection con = null;
        PreparedStatement ps = null;
        try{
            con = dataSource.getConnection();
            ps = con.prepareStatement(query);
            ps.setString(1, employee.getName());
            ps.setString(2, employee.getRole());
            ps.setInt(3, employee.getId());
            int out = ps.executeUpdate();
            if(out !=0){
                System.out.println("Employee updated with id="+employee.getId());
            }else System.out.println("No Employee found with id="+employee.getId());
        }catch(SQLException e){
            e.printStackTrace();
        }finally{
            try {
                ps.close();
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
 
    public void deleteById(int id) {
        String query = "delete from Employee where id=?";
        Connection con = null;
        PreparedStatement ps = null;
        try{
            con = dataSource.getConnection();
            ps = con.prepareStatement(query);
            ps.setInt(1, id);
            int out = ps.executeUpdate();
            if(out !=0){
                System.out.println("Employee deleted with id="+id);
            }else System.out.println("No Employee found with id="+id);
        }catch(SQLException e){
            e.printStackTrace();
        }finally{
            try {
                ps.close();
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
 
}
```

# JDBC templates

**What is it for?**

Simplify DB access by removing boilerplate code and introduce higher level of abstraction. Thanks to JDBC templates we can focus on business value.

|   Action                                                     |   Spring     |   You    |
| ------------------------------------------------------------ |:------------:| --------:|
|   Define connection parameters.                              |              |   X      |
|   Open the connection.                                       |   X          |          |
|   Specify the SQL statement.                                 |              |   X      |
|   Declare parameters and provide parameter values            |              |   X      |
|   Prepare and execute the statement.                         |   X          |          | 
|   Set up the loop to iterate through the results (if any).   |   X          |          |
|   Do the work for each iteration.                            |              |   X      |
|   Process any exception.                                     |   X          |          | 
|   Handle transactions.                                       |   X          |          | 
|   Close the connection, statement and resultset.             |   X          |          |

**Dependencies**

Add Spring dependencies in ```pom.xml``` :

```xml
<properties>
    ...
    <spring-jdbc.version>3.1.3.RELEASE</spring-jdbc.version>
</properties>

<dependencies>
    ...
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>${spring-jdbc.version}</version>
    </dependency>
</dependencies>
```

**Logging**

Dependency for Log4j:

```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

Configuration for logging to console + JdbcTemplate in ```log4j.properties```:

```
# Root logger option
log4j.rootLogger=INFO, stdout

# Direct log messages to stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n

log4j.logger.org.springframework.jdbc.core = TRACE
```

**DAO**

```java
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
 
import javax.sql.DataSource;
 
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
 
public class EmployeeDAOJDBCTemplateImpl {
 
    private DataSource dataSource;
 
    public Employee getById(int id) {
        String query = "select id, name, role from Employee where id = ?";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
         
        Employee emp = jdbcTemplate.queryForObject(query, new Object[]{id}, new RowMapper<Employee>(){
 
            @Override
            public Employee mapRow(ResultSet rs, int rowNum)
                    throws SQLException {
                Employee emp = new Employee();
                emp.setId(rs.getInt("id"));
                emp.setName(rs.getString("name"));
                emp.setRole(rs.getString("role"));
                return emp;
            }});
         
        return emp;
    }
 
    public List<Employee> getAll() {
        String query = "select id, name, role from Employee";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List<Employee> empList = new ArrayList<Employee>();
  
        List<Map<String,Object>> empRows = jdbcTemplate.queryForList(query);
         
        for(Map<String,Object> empRow : empRows){
            Employee emp = new Employee();
            emp.setId(Integer.parseInt(String.valueOf(empRow.get("id"))));
            emp.setName(String.valueOf(empRow.get("name")));
            emp.setRole(String.valueOf(empRow.get("role")));
            empList.add(emp);
        }
        return empList;
    }
 
    public void create(Employee employee) {
        String query = "insert into Employee (id, name, role) values (?,?,?)";
         
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
         
        Object[] args = new Object[] {employee.getId(), employee.getName(), employee.getRole()};
         
        int out = jdbcTemplate.update(query, args);
         
        if(out !=0){
            System.out.println("Employee saved with id="+employee.getId());
        }else System.out.println("Employee save failed with id="+employee.getId());
    }
 
    public void update(Employee employee) {
        String query = "update Employee set name=?, role=? where id=?";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        Object[] args = new Object[] {employee.getName(), employee.getRole(), employee.getId()};
         
        int out = jdbcTemplate.update(query, args);
        if(out !=0){
            System.out.println("Employee updated with id="+employee.getId());
        }else System.out.println("No Employee found with id="+employee.getId());
    }
 
    public void deleteById(int id) {
        String query = "delete from Employee where id=?";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
         
        int out = jdbcTemplate.update(query, id);
        if(out !=0){
            System.out.println("Employee deleted with id="+id);
        }else System.out.println("No Employee found with id="+id);
    }
  
}
```