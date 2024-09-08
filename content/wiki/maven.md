---
title: Maven
---

# Lifecycle

1. validate
2. initialize
3. generate-sources
4. process-sources
5. generate-resources
6. process-resources
7. compile
8. process-classes
9. generate-test-sources
10. process-test-sources
11. generate-test-resources
12. process-test-resources
13. test-compile
14. process-test-classes
15. test
16. prepare-package
17. package
18. pre-integration-test
19. integration-test
20. post-integration-test
21. verify
22. install
23. deploy

# Properties

**Built-in properties**

* ```${basedir}``` represents the directory containing ```pom.xml```
* ```${version}``` equivalent to ```${project.version}``` (deprecated: ```${pom.version}```)

**Pom/Project properties**

All elements in the pom.xml, can be referenced with the project. prefix. This list is just an example of some commonly used elements. (deprecated: {pom.} prefix)

* ```${project.build.directory}``` results in the path to your "```target```" directory, this is the same as ```${pom.project.build.directory}```
* ```${project.build.outputDirectory}``` results in the path to your "```target/classes```" directory
* ```${project.name}``` refers to the name of the project (deprecated: ```${pom.name}``` ).
* ```${project.version}``` refers to the version of the project (deprecated: ```${pom.version}```).
* ```${project.build.finalName}``` refers to the final name of the file created when the built project is packaged

**Local user settings**

Similarly, values in the user's ```settings.xml``` can be referenced using property names with ```settings.``` prefix.

* ```${settings.localRepository}``` refers to the path of the user's local repository

**Environment variables**

Environment variables can be referenced using the env prefix

* ```${env.M2_HOME}``` returns the Maven2 installation path.
* ```${java.home}``` specifies the path to the current ```JRE_HOME``` environment use with relative paths to get for example:
* ```<jvm>${java.home}../bin/java.exe</jvm>```

**Java system properties**

All Java System Properties defined by the JVM.

**Custom properties in the POM**

User defined properties in the ```pom.xml```.

```xml
<project>
...
  <properties>
     <my.filter.value>hello</my.filter.value>
  </properties>
...
</project>
```

* ```${my.filter.value}``` will result in hello if you inserted the above XML fragment in your ```pom.xml```

**Parent Project variables**

How can parent project variables be accessed?

You can use the prefix: ```${project.parent}```.

A good way to determine possible variables is to have a look directly at the API. I'm currently using Maven 2.2.1, and to access the Parent you can use ```${project.parent}```. This will return an ```org.apache.maven.project.MavenProject``` instance.

To access the parent version: ```${parent.version}```.

**Reflection Properties**

The pattern ```${someX.someY.someZ}``` can simply sometimes mean ```getSomeX().getSomeY().getSomeZ()```. Thus, properties such as ```${project.build.directory}``` is translated to ```getProject().getBuild().getDirectory()```.

# Useful maven plugin goals
  
* ```versions:display-dependency-updates``` - Display Dependency Updates                       
* ```versions:display-plugin-updates``` - Display Plugin Updates                           
* ```dependency:tree -Ddetail``` - Display Dependency Tree                          
* ```dependency:list``` - Display Dependency List                          
* ```help:effective-pom``` - Display Effective POM                            
* ```help:effective-settings``` - Display Project Settings                         
* ```help:system``` - Display System and Environment Variables         
* ```dependency:build-classpath``` - Display Build Class Path             
* ```dependency:get -Dartifact=org.apache.hadoop:hadoop-aws:321``` - downloading artifact with dependencies from remote to local repo

# Generating projects from archetype

## Standalone project

```
mvn archetype:generate -DarchetypeArtifactId=maven-archetype-quickstart
```

## Web project

```
mvn archetype:generate -DarchetypeArtifactId=maven-archetype-webapp
```

### Enable Servlet 3.0+ API

The Servlet 3.0 API focuses on ease of development by making use of JSR 175 annotations to enable declarative-style programming.
This allows to reduce XML configuration and use instead annotations or web hooks.

Servlet 3.0 compatible containers are Tomcat 7.x, Glassfish 3.x, JBoss AS 6.x/7.x and, Jetty 8.x.

Provide servlet 3.0 API in order to use it when developing. Not shipping with archive as when running server will provide implementation for that API.

```pom.xml``` :

```xml
<properties>
	...
	<servletapi.version>3.1.0</servletapi.version>
</properties>

<dependencies>
	...
	
	<!-- compile only, deployed container will provide this -->
	<dependency>
		<groupId>javax.servlet</groupId>
		<artifactId>javax.servlet-api</artifactId>
		<version>${servletapi.version}</version>
		<scope>provided</scope>
	</dependency>

</dependencies>
```

Update ```web.xml``` :

```xml
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
			xmlns="http://java.sun.com/xml/ns/javaee"
			xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
			http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
			id="WebApp_ID" version="3.0">

...

</web-app>

```

# Enable Java 1.8

```pom.xml``` :

```xml
<properties>
	<jdk.version>1.8</jdk.version>
</properties>

<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.3</version>
			<configuration>
				<source>${jdk.version}</source>
				<target>${jdk.version}</target>
			</configuration>
		</plugin>
	</plugins>
</build>
```

# Packaging

## Create single jar with all dependencies

```xml
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>2.5.4</version>
    <configuration>
        <archive>
            <manifest>
                <mainClass>io.github.kospiotr.App</mainClass>
            </manifest>
        </archive>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

Then run: ```java -jar project-1.0-SNAPSHOT-jar-with-dependencies.jar```

# Embedded services

## Jetty

**Configuration**

```xml
<plugin>
    <groupId>org.eclipse.jetty</groupId>
    <artifactId>jetty-maven-plugin</artifactId>
    <version>9.2.11.v20150529</version>
    <configuration>
        <scanIntervalSeconds>1</scanIntervalSeconds>
        <webApp>
            <contextPath>/</contextPath>
        </webApp>
        <httpConnector>
            <port>9090</port>
        </httpConnector>
    </configuration>
</plugin>
```

**Run**

```
mvn jetty:run
```

**Open application**

[http://localhost:9090/yourapp](http://localhost:9090/yourapp)

**Usage**

When changing static resources, changes are immediate.
When changing java code, modified classes must be compiled, thus the best to execute: ```mvn package -DskipTests=true```

## Database

Using [In-Memory Database Maven Plugin](http://inmemdb-maven-plugin.btmatthews.com/) it's possible to set up local DB. Supported databases types: hsqldb, derby, h2.
Comprehensive example using it with integration tests: [http://mjremijan.blogspot.com/2014/03/integration-testing-with-maven-and-in.html](http://mjremijan.blogspot.com/2014/03/integration-testing-with-maven-and-in.html).

**Configuration**

```xml
<plugin>
    <groupId>com.btmatthews.maven.plugins.inmemdb</groupId>
    <artifactId>inmemdb-maven-plugin</artifactId>
    <version>1.4.2</version>
    <configuration>
        <monitorKey>inmemdb</monitorKey>
        <monitorPort>11527</monitorPort>
        <type>derby</type>
        <database>test-data</database>
        <username>sa</username>
        <password>as</password>
        <sources>
            <script>
                <sourceFile>src/test/resources/sql/test-data-derby.sql</sourceFile>
            </script>
        </sources>
    </configuration>
</plugin>
```

**Sample data**

```sql
-- Create the tables
CREATE TABLE app_sometable
(
   some_varchar varchar(100),
   some_numeric numeric,
   some_timestamp timestamp,
   some_blob blob
);
-- Insert the data
insert into app_sometable (some_varchar, some_numeric, some_timestamp, some_blob)
values ('unit_test_varchar',123,'1977-01-30-10.11.30.766',null);
```

**Run it**

```mvn inmemdb:run```

**Client**

```xml
<dependency>
    <groupId>org.apache.derby</groupId>
    <artifactId>derbyclient</artifactId>
    <version>10.10.1.1</version>
</dependency>
```

* URL: ```jdbc:derby://localhost/memory:test-data```
* Driver: ```org.apache.derby.jdbc.ClientDriver```
* Hibernate dialect: ```org.hibernate.dialect.DerbyDialect```

# Deployment

## To local Tomcat

See: [Install and configure Tomcat server](/wiki/tomcat)

**Configure deployment process**

```xml
<plugin>
    <groupId>org.apache.tomcat.maven</groupId>
    <artifactId>tomcat7-maven-plugin</artifactId>
    <version>2.2</version>
    <configuration>
        <username>${tomcat.username}</username>
        <password>${tomcat.password}</password>
        <update>true</update>
    </configuration>
</plugin>
```

Now we need to set up credentials to the local server outside the project configuration. Create ```~/.m2/settings.xml``` with content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

    <profiles>
        <profile>
            <id>dev</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <tomcat.username>tomcat</tomcat.username>
                <tomcat.password>tomcat123</tomcat.password>
            </properties>
        </profile>
    </profiles>
</settings>
```

**Deploy application to local server**

```mvn tomcat7:deploy```

# Testing

## Running \*IT tests in a separated phase

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <excludes>
            <exclude>**/*IT.java</exclude>
        </excludes>
    </configuration>
    <executions>
        <execution>
            <id>integration-test</id>
            <goals>
                <goal>test</goal>
            </goals>
            <phase>integration-test</phase>
            <configuration>
                <excludes>
                    <exclude>none</exclude>
                </excludes>
                <includes>
                    <include>**/*IT.java</include>
                </includes>
            </configuration>
        </execution>
    </executions>
</plugin>
```

```mvn verify```

## Code coverage

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.7.0.201403182114</version>
            <executions>
                <execution>
                    <goals>
                        <goal>prepare-agent</goal>
                    </goals>
                </execution>
                <execution>
                    <id>report</id>
                    <phase>prepare-package</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

Run one of:

```bash
verify
test-compile org.jacoco:jacoco-maven-plugin:prepare-agent surefire:test org.jacoco:jacoco-maven-plugin:report
```

## Skipping tests

Reference: [http://maven.apache.org/surefire/maven-surefire-plugin/examples/skipping-test.html](http://maven.apache.org/surefire/maven-surefire-plugin/examples/skipping-test.html)

 * ```mvn install -DskipTests``` - skip executing tests
 * ```mvn install -Dmaven.test.skip=true``` - skip compiling tests

# Releasing

## Set version

* ```mvn versions:set -DnewVersion=1.0.1-123 -DgenerateBackupPoms=false -X```

# Release to Maven Central repository

## Prepare environment

### Setup GnuPG

In order to sign package GnuPG library is required.

#### Install GnuPG

```
sudo apt-get install gnupg2
```

#### Generate or import keys

Import existing keys:

```
wget http://.../public.asc
gpg --import public.asc
wget http://.../secret.asc
gpg --allow-secret-key-import --import secret.asc

```

Generate and distribute public key to public key servers:

```
gpg --gen-key
gpg2 --list-keys 
gpg2 --list-secret-keys
gpg2 --keyserver hkp://pool.sks-keyservers.net --send-keys C6EED57A
```

## Prepare project

## Perform release, deploy, publish

Perform release and deploy artifact to OSSRH with Maven Release Plugin

```
mvn release:clean release:prepare
mvn release:perform
```

Publish release to Maven Central repository

- Go to https://oss.sonatype.org .
- Login with your credentials.
- Locate and Examine Your Staging Repository.
- Close repository in order to trigger the evaluations of the components against the requirements.
- If everything went without issues, click Release button. This will move the components into the release repository of OSSRH where it will be synced to the Central Repository.

# Related

* [http://javarevisited.blogspot.com/2016/08/top-10-maven-plugins-every-java-developer-know.html](http://javarevisited.blogspot.com/2016/08/top-10-maven-plugins-every-java-developer-know.html)
* [http://maven.apache.org/ref/current/maven-embedder/cli.html](http://maven.apache.org/ref/current/maven-embedder/cli.html)
