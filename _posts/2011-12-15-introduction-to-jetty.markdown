---
layout: post
title:  "Jetty - poręczny serwerek"
description: "Jetty jako narzędzie ułatwiające życie programistom Java"
date:   2011-12-15 22:16:00
gallery: true
---
W trakcie tworzenia aplikacji internetowych przychodzi moment kiedy należy go umieścić na jakimś serwerze. Do dyspozycji mamy naprawdę szeroką pulę począwszy od lekkiego Tomcata po serwery aplikacji takie jak GlassFish czy JBoss.
Dzisiaj zaprezentujemy malutki i zgrabniutki kontener serwletów Jetty. Jego główną zaletą nad pozostałymi jest banalna konfiguracja oraz szybkość uruchamiania.
Konfiguracja całości w projekcie budowanym za pomocą Mavena sprowadza się do dodania następującego plugina w pliku pom.xml:

```xml
<plugin>
	<groupId>org.mortbay.jetty</groupId>
	<artifactId>maven-jetty-plugin</artifactId>
	<configuration>
		<scanIntervalSeconds>10</scanIntervalSeconds>
		<contextPath>/</contextPath>
	</configuration>
</plugin>
```

Uruchomienie serwera odbywa się za pomocą: ```jetty:run``` bądź ```jetty:run-exploded```. Przed uruchomieniem nastąpi build projektu a następnie jego automatyczne wdrożenie (deploy) pod kontekstem /. Jeżeli wszystko zakończyło się powodzeniem aplikacja staje się dostępna pod adresem: ```localhost:8080```.

Bardzo przydatną funkcjonalnością w każdym serwerze jest tzw. ```hot-deploy```. Jest to możliwość serwera do wdrożenia aplikacji na uruchomionym serwerze. Co pewien czas skanowany jest kod i jeżeli ten się zmienił to wówczas następuje redeploy.

Tworząc typowy projekt wszystko odbywa się automatycznie w interwale podanym w parametrze ```scanIntervalSeconds```, jednak tworząc projekt GWT częścią efektu wyjściowego jest skompilowany do JavaScript-u kod kliencki, dlatego aby zobaczyć zmiany należy najlepiej skompilować cały projekt od nowa. Zwykle w tym celu wykonuje się polecenie

```bash
mvn clean install
```

ale to nie zadziała, gdy serwer jest uruchomiony, ponieważ serwer tworzy podfolder work w folderze target, który jest zablokowany i każda próba zakończy się niepowodzeniem.
Aby redeployować projekt GWT należy uruchomić go poleceniem:

```bash
mvn jetty:run-exploded
```

a następnie jeżeli chcemy odświeżyć część kliencką wykonujemy kompilację bez kasowania folderu target:

```bash
mvn install
```

W trakcie kompilacji co 10 sekund serwer będzie deployował projekt a po zakończeniu kompilacji można odświeżyć stronę z wprowadzonymi zmianami.