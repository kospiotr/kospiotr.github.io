---
layout: post
title:  "Podstawowy projekt z użyciem Hibernate"
description: "Prezentacja Hibernate jako narzędzia do utrwalania danych"
date:   2012-02-02 22:16:00
toc: true
---
W dzisiejszym poście zaprezentujemy jak stworzyć projekt, który może stanowić wejście dla przyszłych projektów wykorzystujących Hibernate oraz Mavena. Do zamockowania bazy danych posłużymy się wbudowaną (embeded) bazą danych – Derby.

##Nowy projekt

Nalezy utworzyć nowy projekt za pomoca polecenia:

```bash
mvn -DarchetypeGroupId=org.apache.maven.archetypes
-DarchetypeArtifactId=maven-archetype-quickstart
-DarchetypeVersion=1.1
-DarchetypeRepository=http://repo1.maven.org/maven2
-DgroupId=pl.xperios
-DartifactId=HibernateMavenStarter
-Dversion=1.0-SNAPSHOT
-Dpackage=pl.xperios.HibernateMavenStarter
-Dbasedir=C:\\Projects\\Starters
-Darchetype.interactive=false –batch-mode archetype:generate
```

##Konfiguracja zależności

Po stworzeniu struktury projektu należy dodać zależności Hibernate. Ponieważ nie występują w repozytorium centralnym najpierw należy dodać odpowiednie repozytoria do pliku pom.xml:

```xml
    <repositories>
        <repository>
            <id>sonatype-snapshots</id>
            <name>Sonatype Snapshots</name>
            <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
        <repository>
            <url>http://download.java.net/maven/2/</url>
            <id>download.java.net</id>
            <layout>default</layout>
            <name>Hibernate support</name>
        </repository>
    </repositories>
```

Od tej pory do projektu możemy dołączać również zależności, które nie znajdują się w repozytorium centralnym:

```xml
<dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.16</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.5.6</version>
        </dependency>
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate</artifactId>
            <version>3.2.5.ga</version>
        </dependency>
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-entitymanager</artifactId>
            <version>3.3.2.GA</version>
        </dependency>
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-validator</artifactId>
            <version>4.1.0.Final</version>
        </dependency>
        <dependency>
            <groupId>javax.sql</groupId>
            <artifactId>jdbc-stdext</artifactId>
            <version>2.0</version>
        </dependency>
        <dependency>
            <groupId>javax.transaction</groupId>
            <artifactId>jta</artifactId>
            <version>1.0.1B</version>
        </dependency>
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>ejb3-persistence</artifactId>
            <version>1.0.1.GA</version>
        </dependency>
        <dependency>
            <groupId>org.apache.derby</groupId>
            <artifactId>derbyclient</artifactId>
            <version>10.8.1.2</version>
        </dependency>
    </dependencies>
```

Po zapisaniu projektu i pierwszej kompilacji zostaną pobrane zależności do lokalnego repozytorium. W tym celu należy wydać polecenie:

```bash
mvn clean install
```

##Klasa pomocnicza HibernateUtil

Pracę zaczynamy od stworzenia specjalnej klasy narzędziowej, która inicjuje konfigurację oraz pozwala na dostęp do usług Hibernate poprzez metody statyczne:

```java
package pl.xperios.hibernatestarter;

import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.SessionFactory;

public class HibernateUtil {

	private static final SessionFactory sessionFactory;

	static {
		try {
			sessionFactory = new AnnotationConfiguration().configure().buildSessionFactory();
		} catch (Throwable ex) {
			System.err.println("Initial SessionFactory creation failed." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
}
```

##Konfiguracja Hibernate

Powyższa klasa inicjuje konfigurację opartą na anotacjach a następnie odczytuje konfiguracje z jednego z możliwych źródeł. My posłużymy się plikiem konfiguracyjnym zawartym w pliku xml. W tym celu należy stworzyć plik hibernate.cfg.xml w folderze src/main/resources o następującej treści:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN" "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
  <session-factory>
    <property name="hibernate.dialect">org.hibernate.dialect.DerbyDialect</property>
    <property name="hibernate.connection.driver_class">org.apache.derby.jdbc.ClientDriver</property>
    <property name="hibernate.connection.url">jdbc:derby://localhost:1527/sample</property>
    <property name="hibernate.connection.username">app</property>
    <property name="hibernate.connection.password">app</property>
    <property name="hibernate.show_sql">true</property>
    <property name="hibernate.hbm2ddl.auto">create-drop</property>
    <property name="hibernate.current_session_context_class">thread</property>
    <property name="hibernate.transaction.auto_close_session">true</property>
  </session-factory>
</hibernate-configuration>
```

Powyższy plik definiuje między innymi:

 * połączenie z bazą danych:
  * sterownik ```hibernate.connection.driver_class```
  * url ```hibernate.connection.url```
  * login ```hibernate.connection.username```
  * hasło ```hibernate.connection.password```
  * dialekt ```hibernate.dialect```
 * pokazywanie w konsoli wykonywanych zapytań do bazy ```hibernate.show_sql```
 * kontekst aplikacji ```hibernate.current_session_context_class```
 * automatyczne zamykanie transakcji ```hibernate.transaction.auto_close_session```, które upraszcza obsługę transakcji
 * strategia zarządzania strukturą w bazie danych ```hibernate.hbm2ddl.auto```

#Tworzenie pierwszej encji

W celu przetestowania poprawności konfiguracji stworzymy i zarejestrujemy prostą encję użytkownika naszej aplikacji. W tym celu stworzymy prostą klasę encji:

```java
package pl.xperios.hibernatestarter.model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long userId;
    String name;
    String fullName;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "UserData{" + "userId=" + userId + ", name=" + name + ", fullName=" + fullName + '}';
    }
}
```

Powyższa encja została oznaczona za pomocą anotacji ```@Entity```, dzięki czemu Hibernate będzie stworzononą klasę traktował jako encję.
niektóre właściwości również posiadają anotacje i tak pole userId zostało opatrzone anotacją ID, które przekłada się na to że pole to traktowane jest jako klucz główny wraz ze strategią generowania identyfikatorów w sposób automatyczny.

Powyższą encję należy zarejestrować w pliku konfiguracyjnym Hibernate (```hibernate.cfg.xml```):

```xml
...
    <property name="hibernate.transaction.auto_close_session">true</property>
    <mapping class="pl.xperios.hibernatestarter.model.UserData"/>
  </session-factory>
...
```

##Test

Mając wszystkie elementy tworzymy test, który doda parę rekordów do bazy a następnie pobierze je i wyświetli w konsoli:

```java
package pl.xperios.hibernatestarter;

import java.util.List;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import org.hibernate.Transaction;
import org.hibernate.classic.Session;
import pl.xperios.hibernatestarter.HibernateUtil;
import pl.xperios.hibernatestarter.model.UserData;

public class AppTest extends TestCase {

    public AppTest(String testName) {
        super(testName);
    }

    public static Test suite() {
        return new TestSuite(AppTest.class);
    }

    public void testApp() {

        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Transaction transaction = session.beginTransaction();
        UserData data = new UserData();
        data.setFullName("FullName1");
        data.setName("Name1");
        session.save(data);
        data = new UserData();
        data.setFullName("FullName2");
        data.setName("Name3");
        session.save(data);
        transaction.commit();


        session = HibernateUtil.getSessionFactory().getCurrentSession();
        transaction = session.beginTransaction();
        List output = session.createCriteria(UserData.class).list();
        System.out.println("Size: " + output.size());
        System.out.println("Size: " + output);
        transaction.commit();
    }
}
```

W konsoli powinno zostać wyświetlony następujący wynik:

```bash
Hibernate: insert into UserData (fullName, name, userId) values (?, ?, ?)
Hibernate: insert into UserData (fullName, name, userId) values (?, ?, ?)
Hibernate: select this_.userId as userId0_0_, this_.fullName as fullName0_0_, this_.name as name0_0_ from UserData this_
Size: 2
Size: [UserData{userId=1, name=Name1, fullName=FullName1}, UserData{userId=2, name=Name3, fullName=FullName2}]
```