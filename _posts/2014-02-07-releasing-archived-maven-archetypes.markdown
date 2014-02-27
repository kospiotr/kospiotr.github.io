---
layout: post
title:  "Wydawanie aplikacji w formie zarchiwizowanej"
description: "Zautomatyzowane wydanie projektu w formie archiwum zip przy pomocy Mavena"
date:   2014-02-07 22:16:00
gallery: false
---
Jednym z elementów cyklu życia projektu jest wydanie jego wersji. W zależności co tak na prawdę tworzymy efektem końcowym jest aplikacja gotowa do uruchomienia przez klienta, bądź biblioteka wykorzystywana w innych projektach. Oto czym się głównie charakteryzują:

 * aplikacja – posiada strukturę dostosowaną do projektu (jednakowa nazwa artefaktu np.: aplikacja.jar, zależności umieszczone w folderze lib, zasoby porozmieszczane w oddzielnych folderach np.: Pomoc, Img, Log, Raporty itp.), dokumentacja użytkownika, przykładowe pliki konfiguracyjne, dołączone jedynie binaria
 * biblioteka – ustandaryzowana struktura wydania (dobra konwencja), dołączenie binariów, bardzo często nie dołącza się zależności, przykłady, dokumentacja techniczna, strona site-ów wraz z wynikami testów, javadoc itp.

Oczywiście powyższy opis może odbiegać nawet znacząco od realiów panujących w waszej firmie, niemniej chodzi o to, że istnieją znaczące różnice w sposobach wydawania wersji.

W dniu dzisiejszym zajmiemy się tworzeniem archiwum zip, które będzie zawierało gotową do publikacji aplikację / bibliotekę. Do tego celu posłuży nam Maven w wersji 3.0.3. Już samo stosowanie Mavena wymusza w naszym projekcie usystematyzowaną strukturę. Dzięki temu łatwiej możemy otrzymać formę wynikową opracowaną i akceptowaną przez ogromne rzesze użytkowników.
Pierwszym elementem jaki należy dodać odpowiedni plugin assembly:

```xml
<plugin>
	<artifactId>maven-assembly-plugin</artifactId>
		<configuration>
			<descriptors>
				<descriptor>src/main/assembly/bin.xml</descriptor>
			</descriptors>
		<finalName>${artifactId}</finalName>
	</configuration>
</plugin>
```

Definiujemy w nim ścieżkę deskryptora, czyli pliku w którym określimy co zostanie dołączone do archiwum. Gol ```assembly:assembly``` uruchamiający pakowanie powinien zostać wywołany po fazie build dzięki czemu w folderze target będziemy mieli już stworzoną pełną strukturę z której będziemy dysponowali skompilowanymi plikami, które możemy dołączać do archiwum.

Oczywiście następnym krokiem będzie stworzenie pliku ```src/main/assembly/bin.xml```, który w naszym przypadku może wyglądać następująco:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<assembly xmlns="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2 http://maven.apache.org/xsd/assembly-1.1.2.xsd">>
	<id>bin</id>
	<formats>
		<format>zip</format>
	</formats>
	<includeSiteDirectory>true</includeSiteDirectory>
	<fileSets>
		<fileSet>
			<includes>
				<include>Config.properties</include>
			<include>start.bat</include>
		</includes>
		</fileSet>
		<fileSet>
		<directory>target</directory>
		<outputDirectory>.</outputDirectory>
		<includes>
			<include>${artifactId}.jar</include>
		</includes>
		</fileSet>
		<fileSet>
			<directory>target/Pomoc</directory>
			<outputDirectory>Pomoc</outputDirectory>
		</fileSet>
		<fileSet>
			<directory>target/Fonts</directory>
			<outputDirectory>Fonts</outputDirectory>
		</fileSet>
		<fileSet>
			<directory>target/lib</directory>
			<outputDirectory>lib</outputDirectory>
		</fileSet>
	</fileSets>
</assembly>
```

Więcej na temat możliwości archiwizowania można znaleźć [tu](http://maven.apache.org/plugins/maven-assembly-plugin/assembly.html).

Aby wygenerować plik zip należy wydać polecenie:

```bash
clean install site:site assembly:assembly
```

Jeżeli w pliku zip umieszczamy site to gol assembly musi zostać poprzedzony fazą generowania strony.
Plik taki możemy umieścić na stronie firmowej, bądź na hostingu projekty typu code.google.com czy na github.com w dziale z plikami do pobrania.