---
layout: post
title:  "Google Web Toolkit"
description: "Opis i podstawowe elementy (in Polish)"
date:   2014-02-01 22:16:00
---

Google Web Toolkit (GWT) jest szkieletem do tworzenia aplikacji AJAX w oparciu o język Java. Pozwala on na tworzenie kodu bez ręcznego kodowania i łączenia elementów języka Java oraz JavaScript. Po napisaniu kodu aplikacji następuje kompilacja części klienckiej do JavaScriptu, CSS oraz HTML. Część serwerowa zostaje skompilowana przez standardowy kompilator Javy. Framework w standardzie zapewnia poprawne wyświetlanie komponentów w przeglądarkach: Firefox, Opera, IE, Safari, Google Chrome. (Wikipedia.pl)

W skrócie GWT jest frameworkiem, który pozwala na tworzenie aplikacji typu RIA w całości w języku Java. Projekt GWT składa się z części klienckiej i serwerowej. Część kliencka umieszczona jest w odpowiedniej paczce (zazwyczaj client) i podczas kompilacji jest konwertowana za pomocą kompilatora skrośnego do postaci Java Scriptu – formy obsługiwanej natywnie przez przeglądarki internetowe.
Podczas ładowania strony to właśnie część kliencka ładowana jest w całości do pamięci przeglądarki. Dzięki temu każde przejście pomiędzy kolejnymi stronami czy interakcja z komponentami – widgetami nie musi oznaczać przeładowania całej strony. Dzięki temu, że wygenerowany i zoptymalizowany! kod Java Script operuje na elementach DOM naszej strony odnosimy wrażenie, że mamy do czynienia niemal z tradycyjną aplikacją desktopową.
Aplikacja nie musi koniecznie znajdować się na serwerze aplikacji Java. Skompilowana część kliencka może zostać umieszczona na dowolnym serwerze. Dzięki możliwości parsowania plików XML czy JSON GWT może komunikować się z dowolnym WebService-m. Natywnie jednak GWT wspiera komunikację poprzez GWT-RPC – mechanizm asynchronicznej komunikacji z częścią serwerową napisaną w języku Java.

To są jedynie podstawowe zalety GWT, których w rzeczywistości jest cała masa. Według nas jest to obecnie jeden z najlepszych frameworków pozwalających na tworzenie aplikacji typu RIA a w tym artykule opiszemy jedynie podstawowe komponenty typowego projektu GWT. Osoby, które chciałyby rozpocząć pracę z GWT zapraszamy na stronę projektu, gdzie znajduje się szczegółowy poradnik jak uruchomić pierwszy projekt. Po nieco przydługawym wstępie przystępujemy do omawiania najważniejszych elementów.

Każda aplikacja GWT ma budowę modułową, dlatego też każda aplikacja musi posiadać moduł główny. Każdy moduł musi składać się przynajmniej z 2 elementów:

* Deskryptora modułów
* Punktu wejścia


Deskryptor modułów jest to plik xml znajdujący się w paczce w której znajdować się będą zasoby modułu. Nazwa deskryptora będzie określać nazwę całego modułu, np.: Main.gwt.xml sprawi, że moduł ten będzie nazwyać się Main i zawiera on informacje na temat wykorzystywanych zewnętrznych modułów (np. widgetów)

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE module PUBLIC "-//Google Inc.//DTD Google Web Toolkit 1.7.0//EN" "http://google-web-toolkit.googlecode.com/svn/tags/1.7.0/distro-source/core/src/gwt-module.dtd">

<module>
    <inherits name="com.google.gwt.user.User"/>

    <!-- Inherit the default GWT style sheet. You can change -->
    <!-- the theme of your GWT application by uncommenting -->
    <!-- any one of the following lines. -->
    <!-- <inherits name='com.google.gwt.user.theme.standard.Standard'/> -->
    <!-- <inherits name="com.google.gwt.user.theme.chrome.Chrome"/> -->
    <!-- <inherits name="com.google.gwt.user.theme.dark.Dark"/> -->

    <entry-point class="pl.testing.client.MainEntryPoint"/>

    <!-- Do not define servlets here, use web.xml -->
</module>
```


Aby móc wykorzystywać biblioteki zewnętrzne w części klienckiej naszej aplikacji (np dodatkowe widgety) musimy dodać taką bibliotekę do naszego classpatha oraz dodać wpis inherits w deskryptorze modułów np:


```xml
    <inherits name="com.google.gwt.user.User"/>
```

Dlaczego nie wystarczy dodać naszej biblioteki do classpatha i po prostu zacząć z nich korzystać? Niestety jest to trochę skomplikowane. Nie dość, że musimy obowiązkowo dodawać dodatkowe wpisy w deskryptorze to jeszcze nie mogą to być dowolne biblioteki. Muszą to być koniecznie skompilowane w specjalny sposób moduły GWT, które kompilator skrośny jest w stanie przetworzyć do Java Scriptu. Niestety pisząc część kliencką jesteśmy ograniczeni do tzw. środowiska emulowanego. Niestety nie wszystko da się skompilować do postaci Java Scriptu, dlatego użytkownicy są ograniczeni do korzystania z jedynie wybranych klas przygotowanych specjalnie przez Google. Gdy korzystamy z klasy Date, albo String w rzeczywistości wykorzystujemy nadpisaną przez Google klasę, która posiada identyczne metody i zachowanie co oryginalna klasa. Różnią się one jednak tym, że te przesłaniające można skompilować do JS. Obecnie wachlarz udostępnionych klas jest naprawdę ogromny i mówi się, że zaemulowane jest niemalże w pełni środowisko znane z Javy 1.4 z wieloma dodatkami nowszych wersji np. Genericki. Niestety największą bolączką i czymś, co będzie bardzo trudne w przeskoczeniu jest refleksja. Niestety JS nie wspiera refleksji przez co dodawanie kolejnych funkcjonalności, które mogą być zawarte w emulowanym środowisku jest niezwykle utrudnione.
Podsumowując aktualny akapit: aby móc wykorzystywać wspierane zewnętrzne biblioteki przez moduł GWT należy dodać ją do Classpatha oraz do deskryptora bieżącego modułu.
Kolejnym ważnym elementem w deskryptorze jest:

```xml
    <entry-point class="pl.testing.client.MainEntryPoint"/>
```

Jest to tzw. punkt wejścia modułu. Jest to nic innego jak tylko odpowiednik klasy zawierającej metodę public void main(String[] args). Dzięki temu wpisowi podczas uruchamiania wskazanego modułu ładowana jest właśnie klasa pl.testing.client.MainEntryPoint, która musi implementować interfejs EntryPoint i znajdować się w części klienckiej naszego modułu (podfolder client):

```java
package pl.testing.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;

/**
 * Main entry point.
 *
 * @author Praca
 */
public class MainEntryPoint implements EntryPoint {
    /** 
     * Creates a new instance of MainEntryPoint
     */
    public MainEntryPoint() {
    }

    /** 
     * The entry point method, called automatically by loading a module
     * that declares an implementing class as an entry-point
     */
    public void onModuleLoad() {
        final Label label = new Label("Hello, GWT!!!");
        final Button button = new Button("Click me!");
        
        button.addClickHandler(new ClickHandler() {
            public void onClick(ClickEvent event) {
                label.setVisible(!label.isVisible());
            }
        });

        RootPanel.get().add(button);
        RootPanel.get().add(label);
    }
}
```

Kolejnym podstawowym elementem jest strona ładująca. Jest to strona, która zostanie wczytana przez przeglądarkę i załaduje całą naszą aplikację do pamięci przeglądarki.

```xml
<!doctype html>
<!--
The DOCTYPE declaration above will set the browser's rendering engine into
"Standards Mode". Replacing this declaration with a "Quirks Mode" doctype may
lead to some differences in layout.
-->
<html>
    <head>
        <meta name='gwt:module' content='pl.testing.Main=pl.testing.Main'>
        <title>Main</title>
    </head>
    <body>
        <script type="text/javascript"  src="pl.testing.Main/pl.testing.Main.nocache.js"></script>
    </body>
</html>
```

Najważniejszymi tutaj są:

```<meta name=’gwt:module’ content=’pl.testing.Main=pl.testing.Main’>``` – określa główny moduł
```<script type=”text/javascript” src=”pl.testing.Main/pl.testing.Main.nocache.js”&gt</script>``` – skrypt ładujący skompilowaną aplikację do javy scriptu
Plik konfiguracyjny aplikacji, zawierający na początku jedynie wpis o stronie ładującej aplikację JEE powinien wyglądać mniej więcej tak:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
    <session-config>
        <session-timeout>
            30
        </session-timeout>
    </session-config>
    <welcome-file-list>
        <welcome-file>welcomeGWT.html</welcome-file>
    </welcome-file-list>
</web-app>
```

W przyszłych wpisach przyjżymy się jemu bliżej a większość konfiguracji związanych z mapowaniem servletów, które muszą znajdować się właśnie w tym pliku przeniesiemy do wygodnego modułu.

Ostatnim elementem, który należy wspomnieć to kompilacja projektu. Aplikację taką można kompilować zarówno za pomocą Anta jak i Mavena. Nie będziemy zagłębiać się tutaj w szczegóły na ten temat, ponieważ większość czynności wykonują za nas IDE wraz z odpowiednimi wtyczkami.

Spragnionych większej dawki wiedzy odsyłam do strony domowej frameworka: http://code.google.com/intl/pl-PL/webtoolkit/ .
W następnej części już szczegółowo zajmiemy się Guice-m oraz Hibernate-m.