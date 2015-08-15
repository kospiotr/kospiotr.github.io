---
layout: wiki
title: Tomcat
comments: false
toc: true
editurl: wiki/testing.md
---

The server will be used for local testing purposes.

# Install server

* Download Tomcat from [http://tomcat.apache.org/](http://tomcat.apache.org/)
* Extract it to ```c:/opt/``` if Widows or ```/opt``` if Linux
* If Linux set permissions: ```chmod 777 /opt/apache-tomcat-8.0.24``` and ```/opt/apache-tomcat-8.0.24/bin/catalina.sh```

# Configure server

In order to enable deployment to server it is required to create authorized user with manager-script role. Edit file ```conf/tomcat.users.xml``` and add:
 
```
  <role rolename="manager-script" />
  <user username="tomcat" password="tomcat123" roles="manager-script"/>
```

Use your own credentials!!!

# Run server

* To run server as separate process: ```catalina start```
* To terminate remote process: ```catalina stop```
* To run server process in current window: ```catalina run```

## [Deploy project using Maven]({{site.baseurl}}/wiki/maven.html#to-local-tomcat)

# Open application

[http://localhost:8080/yourapp](http://localhost:8080/yourapp)