---
layout: post
title:  "Instalacja artefaktu w zdalnym repozytorium Mavena"
description: "Prezentacja sposobu instalacji artefaktu w zdalnym repozytorium z użyciem pluginu wagon"
date:   2012-02-07 22:16:00
---

W jednym z poprzednich wpisów pokazaliśmy jak zdeployować stworzoną zależność po skompilowaniu projektu. Dzisiejszy wpis poświęcony jest umieszczaniu zależności w repozytorium przy pomocy linii komend.
Pomimo najszczerszych chęci wykonanie tego zadania zupełnie z linii komend jest niemożliwe. Należy stworzyć pom.xml o następującej treści:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.example</groupId>
   <artifactId>webdav-deploy-pom</artifactId>
   <packaging>pom</packaging>
   <version>1</version>
   <name>Deploy</name>
   <build>
      <extensions>
         <extension>
            <groupId>org.apache.maven.wagon</groupId>
            <artifactId>wagon-webdav</artifactId>
            <version>1.0-beta-2</version>
         </extension>
      </extensions>
   </build>
 
</project>
```

Będzie on dodawał obsługę pluginu służącego do wysyłania zależności na zdalny zasób.
W pliku ```settings.xml```, który znajduje się w domyślnym folderze repozytorium .m2 należy dodać wpis, który pozwoli na autentyfikację do repozytorium, na którym będzie umieszczana zależność:

```xml
<settings 
   xmlns="http://maven.apache.org/SETTINGS/1.0.0"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
   xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
        <server>
            <id>xperios</id>
            <username>your-google-id</username>
            <password>your-google-password</password>
            <filePermissions>775</filePermissions>
            <directoryPermissions>775</directoryPermissions>
        </server>
        <server>
            <id>xperios-snapshot</id>
            <username>your-google-id</username>
            <password>your-google-password</password>
            <filePermissions>775</filePermissions>
            <directoryPermissions>775</directoryPermissions>
        </server>
    </servers>
</settings>
```

Od tego momentu z folderu gdzie znajduje się zasób można wykonać polecenie:

```bash
mvn deploy:deploy-file \
-Durl=dav:https://xperios.googlecode.com/svn/maven-repo\
-DrepositoryId=xperios-maven-repository \
-DgroupId=pl.xperios \
-DartifactId=sample-project \
-Dpackaging=jar \
-Dfile=xperios-sample-project.jar \
-Dversion=1.0 \
-DgeneratePom=true
```

Zostanie dodana zależność do repozytorium znajdującym się pod adresem: ```https://xperios.googlecode.com/svn/maven-repo``` o grupie ```pl.xperios```, artefakcie sample-project i wersji 1.0. Należy pamiętać aby identyfikator repositoryId zgadzał się z identyfikatorem w pliku ```settings.xml```.