---
layout: wiki
title: GWT
comments: false
toc: true
---

#Showcases
* Homepage: [https://developers.google.com/web-toolkit](https://developers.google.com/web-toolkit)
* Documentation: [https://developers.google.com/web-toolkit](https://developers.google.com/web-toolkit)
* Showcase
 * Current: [http://gwt.google.com/samples/Showcase/Showcase.html](http://gwt.google.com/samples/Showcase/Showcase.html)
 * For 1.6: [https://developers.google.com/web-toolkit/doc/latest/RefWidgetGallery](https://developers.google.com/web-toolkit/doc/latest/RefWidgetGallery)
 * Sample mail: [http://gwt.google.com/samples/Mail/Mail.html](http://gwt.google.com/samples/Mail/Mail.html)
 * Dynamic tables: [http://gwt.google.com/samples/DynaTable/DynaTable.html](http://gwt.google.com/samples/DynaTable/DynaTable.html)
 
#Archetype#

##GWT-Maven-Plugin

###Homepage
[http://mojo.codehaus.org/gwt-maven-plugin/user-guide/archetype.html](http://mojo.codehaus.org/gwt-maven-plugin/user-guide/archetype.html)

###Usage
Generate  archetype:

```bash
mvn archetype:generate \
   -DarchetypeGroupId=org.codehaus.mojo \
   -DarchetypeArtifactId=gwt-maven-plugin \
   -DarchetypeVersion=2.5.0
```
###Configuration

```bash
mvn gwt:help
```

###Productivity

###Development mode

```bash
gwt:run
```

###Development mode with debug

```bash
gwt:debug //After that attach debugger on port 8000
```

###Super Development Mode

##TBroyer's archetype

###Homepage
[https://github.com/tbroyer/gwt-maven-archetypes](https://github.com/tbroyer/gwt-maven-archetypes)

###Usage
Generate archetype:

```bash
mvn archetype:generate \
   -DarchetypeCatalog=https://oss.sonatype.org/content/repositories/snapshots/ \
   -DarchetypeGroupId=net.ltgt.gwt.archetypes \
   -DarchetypeArtifactId=modular-webapp \
   -DarchetypeVersion=1.0-SNAPSHOT
```

###Productivity

###Development mode
 * Need first to compile client's project for server side run purposes - next step (execute it on the client project) 

```bash
mvn clean install -Dgwt.compiler.skip=true
```
 * Run server side on embedded Jetty8/Tomcat6/Tomcat7 (execute one of the followings lines on the server project):

```bash
mvn jetty:start -Ddev //for Jetty
mvn tomcat6:run -Ddev //for Tomcat 6
mvn tomcat7:run -Ddev //for Tomcat 7
```
 * Run development mode server - needed only for client side (execute one of the followings lines on client the project)

```bash
mvn gwt:run -Ddev
mvn gwt:debug -Ddev //After that attach debugger on port 8000
```

###Super Development Mode
 * Configure development module. Add to module descriptor:

```xml

    <set-property name="user.agent" value="safari" />
    <!-- enable the SuperDevMode book marklets  -->
    <add-linker name="xsiframe"/>
    <set-configuration-property name="devModeRedirectEnabled" value="true"/>

    <!--  enable source maps -->
    <set-property name="compiler.useSourceMaps" value="true" />
```
 * Clean all targets (execute it on the parent project):

```bash
mvn clean 
```
 * Compile once client side in draft mode (execute it on the client project):

```bash
mvn clean install -Pdev -Dgwt.module=pl.xperios.tdb.App_dev
```
 * Build server side in order to run it on embedded server (execute it on the server project):

```bash
mvn clean install
```
 * Run server side on embedded server (execute one of the following lines on the server project):

```bash
mvn jetty:start -Ddev //for Jetty
mvn tomcat6:run -Ddev //for Tomcat 6
mvn tomcat7:run -Ddev //for Tomcat 7
```
 * Run Super Development Mode:

```bash
mvn.bat generate-sources gwt:run-codeserver  -Pdev -Dgwt.module=pl.xperios.tdb.App_dev
```
 * Add bookmarklet to favourite bar (only first time)
Go to adress that was presented by Super Development's Mode console: [http://localhost:9876/](http://localhost:9876/) and add presented bookmarklt to favourite bar
 * Go to application
Go to adress of the application. Usually it is: [http://localhost:8080](http://localhost:8080)
 * Recompile client side
Hit bookmarklet on the favourite bar and choose module to recompile. The page will refresh itselve.

#Logging
Module Descriptor:

```xml
    <inherits name="com.google.gwt.logging.Logging"/>
    ...
    <!--  logging -->
    <set-property name="gwt.logging.logLevel" value="ALL"/>
    <set-property name="gwt.logging.popupHandler" value="DISABLED" />
```

#Libraries

##Errai

###Configure

pom.xml

```xml
        <dependency>
            <groupId>org.jboss.errai</groupId>
            <artifactId>errai-javaee-all</artifactId>
            <version>${errai.version}</version>
            <exclusions>
                <exclusion>
                    <artifactId>errai-jaxrs-client</artifactId>
                    <groupId>org.jboss.errai</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>javax</groupId>
            <artifactId>javaee-web-api</artifactId>
            <version>6.0</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.jboss.weld.servlet</groupId>
            <artifactId>weld-servlet</artifactId>
            <version>1.1.15.Final</version>
        </dependency>
        <dependency>
            <groupId>org.jboss.errai</groupId>
            <artifactId>errai-weld-integration</artifactId>
            <version>2.4.0.Final</version>
        </dependency>
```

GWT Module Descriptor

```xml
    <inherits name="org.jboss.errai.common.ErraiCommon"/>
    <inherits name="org.jboss.errai.bus.ErraiBus"/>
    <inherits name="org.jboss.errai.ioc.Container"/>
    <inherits name="org.jboss.errai.enterprise.CDI"/>
```

web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">

    <!-- Default page to serve -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>

    <listener>
        <listener-class>org.jboss.weld.environment.servlet.Listener</listener-class>
    </listener>
    <servlet>
        <servlet-name>ErraiServlet</servlet-name>
        <servlet-class>org.jboss.errai.bus.server.servlet.DefaultBlockingServlet</servlet-class>
        <init-param>
            <param-name>service-locator</param-name>
            <param-value>org.jboss.errai.cdi.server.CDIServiceLocator</param-value>
        </init-param>
        <init-param>
            <param-name>auto-discover-services</param-name>
            <param-value>true</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>ErraiServlet</servlet-name>
        <url-pattern>*.erraiBus</url-pattern>
    </servlet-mapping>


    <resource-env-ref>
        <description>Object factory for the CDI Bean Manager</description>
        <resource-env-ref-name>BeanManager</resource-env-ref-name>
        <resource-env-ref-type>javax.enterprise.inject.spi.BeanManager</resource-env-ref-type>
    </resource-env-ref>

    <resource-env-ref>
        <description>Object factory for the Errai Service</description>
        <resource-env-ref-name>ErraiService</resource-env-ref-name>
        <resource-env-ref-type>org.jboss.errai.bus.server.service.ErraiService</resource-env-ref-type>
    </resource-env-ref>

    <context-param>
        <param-name>errai.properties</param-name>
        <param-value>/WEB-INF/errai.properties</param-value>
    </context-param>
</web-app>

```

Context.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context antiJARLocking="true" path="/Errai">
    <Resource 
        name="BeanManager" 
        auth="Container" 
        type="javax.enterprise.inject.spi.BeanManager" 
        factory="org.jboss.weld.resources.ManagerObjectFactory"/>
    
</Context>
```

Add empty file beans.xml to WEB-INF
Add empty file ErraiApp.properties to resource folder
Add ErraiService.properties to resoure folder

```bash
errai.dispatcher_implementation=org.jboss.errai.bus.server.SimpleDispatcher
errai.async.thread_pool_size=5
```

##GWTP

##Mvp4g

###Project info

 * Homepage [https://code.google.com/p/mvp4g/](https://code.google.com/p/mvp4g/)

###Set up with Maven

Dependency:

```xml
    <dependency>
      <groupId>com.googlecode.mvp4g</groupId>
      <artifactId>mvp4g</artifactId>
      <version>1.4.0</version>
    </dependency>
```
Module Descriptor:

```xml
<inherits name='com.sencha.gxt.ui.GXT' />
<entry-point class='com.mvp4g.client.Mvp4gEntryPoint'/>
```

##GIN

##Command pattern

##GXT

###Project  info

UI component library

 * Homepage 

###Set up with Maven

Dependency:

```xml
<dependency>
<groupId>com.sencha.gxt</groupId>
<artifactId>gxt</artifactId>
<version>3.0.0</version>
</dependency>
```
Module Descriptor:

```xml
<inherits name='com.sencha.gxt.ui.GXT' />
<stylesheet src="reset.css"/>
```

##Smartclient

###Project info
 * Showcase: [http://www.smartclient.com/smartgwt/showcase](http://www.smartclient.com/smartgwt/showcase)

##GWT-Bootstrap

###Project  info

UI component library

* Homepage: [http://gwtbootstrap.github.com/](http://gwtbootstrap.github.com/)
* Sources on GitHub: [https://github.com/gwtbootstrap](https://github.com/gwtbootstrap)
* Example: [https://github.com/gwtbootstrap/custom-theme-example](https://github.com/gwtbootstrap/custom-theme-example)
* Java-Doc: [http://gwtbootstrap.github.com/gwt-bootstrap/apidocs/](http://gwtbootstrap.github.com/gwt-bootstrap/apidocs/)
* Downloads: [https://github.com/gwtbootstrap/gwt-bootstrap/downloads](https://github.com/gwtbootstrap/gwt-bootstrap/downloads)
* Group: [https://groups.google.com/forum/#!forum/gwt-bootstrap](https://groups.google.com/forum/#!forum/gwt-bootstrap)
* G+: [https://plus.google.com/u/1/114813078723642511929/posts](https://plus.google.com/u/1/114813078723642511929/posts)
* Committer blog: [http://caarlos0.github.com/about.html](http://caarlos0.github.com/about.html)

###Set up with maven

Dependency:

```xml
<dependency>
    <groupId>com.github.gwtbootstrap</groupId>
    <artifactId>gwt-bootstrap</artifactId>
    <version>2.2.1.0-SNAPSHOT</version>
    <scope>provided</scope>
</dependency>
```
Repository:

```xml
<repository>
     <id>sonatype</id>
     <url>http://oss.sonatype.org/content/repositories/snapshots</url>
     <snapshots><enabled>true</enabled></snapshots>
     <releases><enabled>false</enabled></releases>
</repository>
```
GWT module descriptor:

```xml
<inherits name="com.github.gwtbootstrap.Bootstrap"/>
```
#Tools