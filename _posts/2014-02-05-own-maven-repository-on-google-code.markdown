---
layout: post
title:  "Prywatne repozytorium Maven na code.google.pl"
description: "Tworzenie i konfiguracja prywatnego repozytorium Maven (in Polish)"
date:   2014-02-05 22:16:00
---
Często tworząc nowy projekt (z reguły opensource) w naszym przypadku wykorzystujemy jako repozytorium popularny ```Github```, ```Bitbucket``` lub  ```code.google.com```. Aby podnieść walor biznesowy i jakość świadczonych usług normalnym jest częste wydawanie nowej wersji naszej aplikacji klientom / społeczności. Proces ten czasmi jest dosyć tendencyjny i uciążliwy. Powtarzające się procesy oczywiście dociekliwy programista jest w stanie sobie zautomatyzować w bardzo zwinny sposób.

Dzisiaj pokażemy jak posiadając projekt na ```code.google.com``` stworzyć z niego własne repozytorium wykorzystując do tego mavena w wersji ```3.0.3```.

plik pom.xml

```xml
<project>

	<repositories>
		<repository>
			<id>google</id>
			<name>[Project Name] Maven Repository</name>
			<url>https://[project-name].googlecode.com/svn/maven-repo/releases</url>
		</repository>
	</repositories>

	<distributionManagement>
		<repository>
			<id>google</id>
			<name>Maven Repository for Config Processor Plugin (releases)</name>
			<url>dav:https://[project-name].googlecode.com/svn/maven-repo/releases</url>
			<uniqueVersion>false</uniqueVersion>
		</repository>
		<snapshotRepository>
			<id>google</id>
			<name>Maven Repository for Config Processor Plugin (snapshots)</name>
			<url>dav:https://[project-name].googlecode.com/svn/maven-repo/snapshots</url>
			<uniqueVersion>false</uniqueVersion>
		</snapshotRepository>
	</distributionManagement>

	<build>
		<extensions>
			<extension>
				<groupId>org.apache.maven.wagon</groupId>
				<artifactId>wagon-webdav</artifactId>
				<version>1.0-beta-2</version>
			</extension>
		</extensions>
	</build>
```

i dodatkowo w pliku settings.xml:

```xml
<servers>
	<server>
		<id>google</id>
		<username>[my-login]</username>
		<password>[my password]</password>
		<filePermissions>775</filePermissions>
		<directoryPermissions>775</directoryPermissions>
	</server>
</servers>
```

Objaśnienia poszczególnych elementów w pliku pom.xml:

 * **repositories -> repository** – wskazuje miejsce wyszukiwania artefaktów umieszczonych z innych projektów
distributionManagement -> repository – wskazuje miejsce, gdzie nowo skompilowane wersje zostaną uploadowane w fazie deploy; w tym miejscu pojawią się jedynie wersje, które nie są opatrzone suffixem SNAPSHOT w wersji projektu np: ``` <version>1.0.1</version> ```

 * **distributionManagement -> snapshotRepository** – wskazuje miejsce, gdzie nowo skompilowane wersje zostaną uploadowane w fazie deploy; w tym miejscu pojawią się jedynie wersje, które są opatrzone suffixem SNAPSHOT w wersji projektu np: ``` <version>1.0.1-SNAPSHOT</version> ```
 * **extension** - dodany connector, który obsługuje protokół webDav, który jest implementowany przez subversion wykorzystywany przez code.google.com

Objaśnienia poszczególnych elementów w pliku settings.xml:

 * **servers -> server** – definiuje loginy i hasła do konta dostępowego z prawami zapisu do projektu
 

Jeżeli występuje błąd 401 oznacza to błąd autoryzacji dla powyższych danych.

Projekt zostanie uploadowany na serwer w fazie deploy dlatego aby przetestować nową funkcjonalność wydajemy polecenie:

``` mvn clean install deploy:deploy ```