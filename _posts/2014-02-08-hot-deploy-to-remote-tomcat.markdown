---
layout: post
title:  "Wdrożenie aplikacji na Tomcata"
description: "Zautomatyzowane wdrozenia aplikacji na serwer Tomcat z uzyciem Mavena i pluginu Cargo"
date:   2014-02-08 22:16:00
gallery: false
---
W pewnym punkcie pracy z projektem J2EE, (projekt webowy) dochodzimy do punktu, w którym przychodzi potrzeba umieszczenia go na serwerze czy to kontenerze aplikacji. Po umieszczeniu na serwerze można przetestować jego działanie ale również uruchomić np testy integracyjne.

Ponieważ takich serwerów może istnieć wiele (lokalny, zdalny, klient, …) poszczególne warianty można umieścić np. oddzielnych profilach.

Zdefiniujmy profil, który będzie wykorzystywał plugin cargo, który bedzie łączył się ze zdalnym serwerem tomcat 7.x:

```xml
<profile>
	<id>tomcat-remote</id>
	<build>
		<plugins>
			<plugin>
				<groupId>org.codehaus.cargo</groupId>
				<artifactId>cargo-maven2-plugin</artifactId>
				<version>1.1.3</version>
				<configuration>
					<container>
					<containerId>tomcat7x</containerId>
					<type>remote</type>
					</container>
					<configuration>
						<type>runtime</type>
							<properties>
							<cargo.server.settings>my-tomcat-credentials</cargo.server.settings>
							<cargo.remote.uri>http://10.10.10.105:8080/manager/text</cargo.remote.uri>
						</properties>
					</configuration>
				</configuration>
			</plugin>
		</plugins>
	</build>
</profile>
```

Ostatnią rzeczą jaką należy dodać to dane, które pozwolą pluginowi na uwierzytelnienie na serwerze. Dane te wprowadzimy w pliku settings.xml, aby umieszczać hasel w publicznym miejscu jakim jest repozytorium:

```xml
<server>
	<id>my-tomcat-credentials</id>
	<configuration>
		<cargo.remote.username>mylogin</cargo.remote.username>
		<cargo.remote.password>mypassword</cargo.remote.password>
	</configuration>
</server>
```

Tu należy wyjaśnić kilka kwesti:

 * Plugin cargo pozwala na zarządzanie serwerem / kontenerem poprzez: uruchamianie, zatrzymywanie, undeploy, deploy i parę innych
 * Zarządzać można serwerem zainstalowanym lokalnie, zdalnym oraz można podać link do archiwum zip na stronie internetowej z dyrektywą aby plugin sam zainstalował serwer w podanej lokalizacji. Oczywiście projekt można deployować na serwerach zatrzymanych jak i uruchomionych.
 * Url do tomcata w wersji 7.x należy podać do managera tekstowego. 
 * Aby móc zarządzać kontenerem należy użytkownikowi, za pomocą którego łączymy się z serwerem dodać uprawnienie `manager-script`. Aby to zrobić należy wyedytować plik `tomcat-users.xml` znajdujący się w folderze `%TOMCAT_DIR%/conf/tomcat-users.xml` a następnie dodać po przecinku w roles wskazanego użytkownika `manager-script`.

Deploy pliku war następuje po wydaniu polecenia:

```bash
mvn -Ptomcat-remote clean verify org.codehaus.cargo:cargo-maven2-plugin:deploy
```

Po parametrze -P podajemy nazwę profilu, który jest aktywowany podczas uruchomienia. Jeżeli nie zostanie wskazany domyślne parametry zostaną wykorzystane a wtedy na 90% zostanie rzucony wyjątek.
Oczywiście zaprezentowany przykład zadziała jedynie gdy serwer jest uruchomiony i nie istnieje wcześniej zdeployowany aktualny projekt.

Serwer należy uruchomić, przejść do managera aplikacji a następnie wykonać undeploy.