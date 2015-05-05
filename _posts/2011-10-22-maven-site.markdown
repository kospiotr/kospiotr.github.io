---
layout: post
title:  "Maven site"
description: "Tworzenie dokumentacji projektu przy pomocy mechanizmu site z Mavena (in Polish)"
date:   2011-10-22 22:16:00
---

Jak wiadomo kolejnym etapem po, a jeszcze lepiej w trakcie realizacji projektu należy przedstawić klientowi dokumentację zarówno użytkownika jak i techniczną. Abstrahując zupełnie od dokumentacji użytkownika dokumentacja techniczna powinna zawierać przynajmniej takie podstawowe elementy jak:

* javadoc,
* FAQ,
* opis użycia,
* pokrycie kotu testami,
* wyniki testów,

i wiele innych zależących od wymogów klientów, góry czy własnych wymagań.

Oprócz części opisowej, którą prowadzić programista musi samodzielnie, w większości powyższych przypadków może wyręczyć nas maven. Dokumentacja generowana jest do postaci strony HTML, którą później można udostępnić w internecie bądź intranecie podobnie jak robi to dosyć spora rzesza producentów oprogramowania w tym sam twórca mavena – apache.

Struktura strony

Definicja struktury strony musi znajdować się w pliku: ```\src\site\site.xml``` i powinna mieć strukturę zgonie z [dokumentacją](http://maven.apache.org/guides/mini/guide-site.html):

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<project name="Maven">

    <bannerLeft>
        <name>Maven</name>
        <src>http://maven.apache.org/images/apache-maven-project.png</src>
        <href>http://maven.apache.org/</href>
    </bannerLeft>
    <bannerRight>
        <src>http://maven.apache.org/images/maven-small.gif</src>
    </bannerRight>
    <body>
        <links>
            <item name="Project Name" href="http://www.project_name.company_name.com/" />
        </links>

        <menu name="Maven 2.0">
            <item name="Introduction" href="index.html"/>
            <item name="Download" href="download.html"/>
            <item name="Release Notes" href="release-notes.html" />
            <item name="General Information" href="about.html"/>
            <item name="For Maven 1.x Users" href="maven1.html"/>
            <item name="Road Map" href="roadmap.html" />
            <item name="FAQ" href="faq.html" />
        </menu>

        <menu ref="modules" />
        <menu ref="reports"/>

    </body>
</project>
```

Niestety od czasu mavena 2 wprowadzono reorganizację struktury projektu co zaowocowało zmianą filozofii wykorzystywania niektórych modułów w tym generowania site-ów. Tym sposobem dokumentacja przeznaczona dla wcześniejszych wersji, której jest ogromna ilość w internecie może powodować zamęt i błędy podczas próby generowania strony. W wersji ```3.0.x``` należy dodać następujący plugin w pliku pom.xml:

```
<plugins>
	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-site-plugin</artifactId>
		<version>3.0-beta-2</version>
	</plugin>
</plugins>
```
Aby przetestować działanie pluginu należy wydać polecenie: ```clean:clean site:site```

Po uruchomieniu strony znajdującej się w ```target\site\index.html``` naszym oczom ukaże się strona jak na załączonym zrzucie:

<a href="{{ site.url }}/img/site_page.jpg"><img src="{{ site.url }}/img/site_page.jpg" ></a>

Strona HTML czyli site może zostać wygenerowany domyślnie z kilku typów źródeł danych takich jak:

* [apt](http://maven.apache.org/doxia/references/apt-format.html) - Almost Plain Text (strony statyczne)
* [xdoc](http://maven.apache.org/doxia/references/xdoc-format.html) (strony statyczne)
* [fml](http://maven.apache.org/doxia/references/fml-format.html) - FAQ

oraz poprzez dostarczenie dodatkowych treści poprzez [pluginy](http://maven.apache.org/plugins/maven-site-plugin/maven-3.html). Stronę taką można [internacjonalizować](http://maven.apache.org/plugins/maven-site-plugin/i18n.html) oraz zmieniać jej wygląd poprzez [skórki](http://maven.apache.org/plugins/maven-site-plugin/examples/templatefile.html). Więcej informacji na temat pluginu oraz jego możliwości dostępnych jest na [oficjalnej stronie](http://maven.apache.org/plugins/maven-site-plugin/index.html) wygenerowanej również przy pomocy mavena.

Ostatnią rzeczą jaką będziemy chcieli zrobić to umieszczenie naszego site-a na serwerze, do którego będą mieli dostęp użytkownicy naszego projektu. W tym celu musimy do naszego pliku pom.xml dodać wpis gdzie chcemy ją umieścić:

```xml
<distributionManagement>
    <site>
        <id>mycompany</id>
        <url>ftp://mycompany.com/public_html/site/my_product_site</url>
    </site>
</distributionManagement>
 ```
oraz należy stworzyć plik settings.xml obok pom.xml, w którym podamy dane niezbędne do logowania się przez protokół ftp:

```xml
<servers>
    <server>
        <id>mycompany</id>
        <username>username</username>
        <password>password</password>
        <filePermissions>775</filePermissions>
        <directoryPermissions>775</directoryPermissions>
    </server>
</servers>
```

Hasło niestety należy podać w postaci jawnej, dlatego nie należy pliku settings.xml wysyłać do repozytorium. Każdy użytkownik, który jest odpowiedzialny za publikację site-a powinien mieć zdefiniowany własny login i hasło poza udostępnionymi elementami.

Oczywiście nie jest to wciąż najbezpieczniejsza metoda przechowywania hasła przed nieporządanym dostępem dlatego można hasła szyfrować za pomocą [tej](http://maven.apache.org/guides/mini/guide-encryption.html#How_to_encrypt_server_passwords) metody.

Aby umieścić stronę na zdalnym serwerze należy wydać polecenie: ```site:deploy```