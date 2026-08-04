---
layout: post
title:  "Hibernate + Guice"
description: "Instalacja, konfiguracja oraz zestawienie z Guicem (in Polish)"
date:   2010-12-16 22:16:00
---

Hibernate – framework do realizacji warstwy dostępu do danych (ang. persistance layer). Zapewnia on przede wszystkim translację danych pomiędzy relacyjną bazą danych, a światem obiektowym (ang. O/R mapping). Opiera się na wykorzystaniu opisu struktury danych za pomocą języka XML, dzięki czemu można “rzutować” obiekty, stosowane w obiektowych językach programowania, takich jak Java bezpośrednio na istniejące tabele bazy danych. Dodatkowo Hibernate zwiększa wydajność operacji na bazie danych dzięki buforowaniu i minimalizacji liczby przesyłanych zapytań. Jest to projekt rozwijany jako open source. (wikipedia.pl)

Hibernate jest kolejnym wyborem naszych specjalistów w kwestii wyboru podstawowych komponentów do tworzenia aplikacji. Jest to najpopularniejszy, najbardziej zaawansowany ORM na rynku. Pomimo jego silnej pozycji chcemy zaznaczyć, że w bardziej zaawansowanych projektach dodatkowo posiłkujemy się MyBatisem, który stanowi doskonałe uzupełnienie bo raczej nie konkurencję :).

Kolejną kwestią, którą należy poruszyć jest to czy używać Hibernate bezpośrednio, czy jako dostawcy JPA. JPA jest jedynie standardem opisanym przez Sun-a i stanowi jedynie interfejs dostępu do danych. Oznacza to, że korzystając z interfejsów JPA podczas pobierania, wyszukiwania czy utrwalania obiektów korzystamy z interfejsu JPA. To co się faktycznie dzieje za kulisami, czyli w jaki sposób komunikacja z bazą się odbywa wykonuje już dostawca usługi ORM, czyli implementacja interfejsu JPA. Najpopularniejszymi implementacjami są: Hibernate, TopLink, Kodo, czy OpenJPA. Tak więc podczas pracy z bazą danych poprzez JPA nie musimy wiedzieć z jakiego mechanizmu obecnie korzystamy. Można to zobrazować do samochodu z silnikiem, bądź komputera i procesora. Silnik i procesor można wymienić na każdy inny pasujący do interfejsu. Nowe elementy spełniają identyczną rolę co ich poprzednicy natomiast swoim działaniem oraz efektami np mocy czy mocy obliczeniowej mogą się różnić od poprzedników. Z interfejsem JPA jest podobnie. JPA jest jak rama samochodu bądź gniazdo procesora – można do niego zainstalować elementy, które będą wykonywały określone czynności ale to urządzenie musi łączyć się ze środowiskiem zewnętrznym w okreslony przez interfejs sposób.
Jest to bardzo ciekawe rozwiązanie, które pozwoli na zastosowanie podzespołu według swoich preferencji. Dzięki wykorzystywaniu JPA w dowolnym momencie możemy wymienić Hibernate na np. TopLink-a. Rzeczywistość niestety nie jest taka różowa jakby się mogło wydawać. JPA jest specyfikacją, która oczywiście ulega ciągłym modyfikacjom (JPA 1.0 -> JPA 2.0), jednak dostawcy ORM oprócz implementacji JPA znacznie poszerzają swoje możliwości idące daleko poza interfejs. Czynnikiem decydującym o rezygnacji z JPA była konfiguracja dostawcy, która nie mogła zostać zdefiniowana dynamicznie a tylko poprzez plik persistance.xml. Ponieważ dążymy do modułowej budowy aplikacji był to niezbędny element. Jako producenci płyty głównej zrezygnowaliśmy ze standardowego gniazda, przez które nie możemy obsłużyć dodatkowych 2 rdzeni procesora. Ponosimy ryzyko, że gdy będziemy chcieli zaktualizować Hibernate-a możemy napotkać problemy ze zgodnością niektórych klas, bądź obsłużyć w sposób wspomagany transakcję ale rzucając na szali liczne możliwości, ułatwienia oraz spełnienia wszystkich wymagań jakie stawialiśmy aplikacji decydujemy się zrezygnować z JPA.

Po nieco przydługawym wstępie pora rozpocząć prace z Hibernate. Jak wspomnieliśmy zależy nam na programowalnej konfiguracji a dokładniej na programowalnym dodawaniu plików z mapowaniami. W tym miejscu ponownie wyprzedzimy nieco wątek. Coraz popularniejszym sposobem definiowania mapowań czy to przez JPA czy przez dostawców jest umieszczanie adnotacji bezpośrednio w klasie domenowej co ma ułatwić, przyspieszyć pracę oraz zmniejszyć ilość kodu. Gdy konfigurowaliśmy Guice-a uciekaliśmy od xml-a właśnie w adnotacje tak tutaj niestety musimy zrobić krok w tył aby wyjść z zaułka do którego byśmy trafili zakładając dalsze wykorzystywanie w naszym projekcie GWT.
Podczas opisu frameworka GWT wspominaliśmy jakie ograniczenia są nałożone na warstwę kliencką. Klasy domenowe, które umieszczone są w części klienckiej mogą być wykorzystywane w części klienckiej, podczas transportowania danych między częścią kliencką a serwerową w mechaniźmie RPC oraz w części serwerowej. Dodając jednak adnotacje czy to Hibernate-owe, czy to JPA dodajemy fragmenty bibliotek niezgodnych z emulowanym środowiskiem GWT. Tym samym takich klas nie będziemy mogli wykorzystać ani w części klienckiej ani w transporcie GWT-RPC.
Jest to dość poważne ograniczenie ponieważ nie ma łatwego sposobu na obejście tego problemu. Jednym ze sposobów jest rezygnacja z adnotacji i wykorzystanie mapowań w XM-u, bądź można napisać klon naszej klasy domenowej, w niej dodać adnotacje a gdy zajdzie potrzeba przesłania danych czy to na stronę kliencką czy z klienckiej do bazy należałoby dane przekazać pomiędzy tymi plikami. Jest to podejście gdzie klon klasy domenowej wykorzystujący adnotacje nazywa się DTO. Istnieją oczywiście dodatkowe biblioteki takie jak Dozzer, które wspomagają pracę z DTO. Biblioteka ta na podstawie mapowania atrybutów jednej klasy do drugiej pozwala na niemal zautomatyzowany proces przepływu danych między obiektami. Niestety podejście DTO sprawia, że potrzebna jest masa dodatkowego kodu w którym również mogą pojawić się błędy a refaktoryzacja czy optymalizacja jest w tym przypadku niezwykle utrudniona, dlatego koncept adnotacji również został przez nas odrzucony. Więcej informacji na temat wspomnianych rozwiązań można znaleźć tu

Załóżmy, że będziemy uwierzytelniać następującą klasę domenową:

```java
public class Person {
    Long id;
    String login;
    String password;
    String displayName;
    Date registrationDate;
    Date lastLoginDate;
    Integer version;

    //getters and setters

    @Override
    public String toString() {
        return "Person{" + "id=" + id + ",login=" + login + ",password=" + password + ",displayName=" + displayName + ",registrationDate=" + registrationDate + ",lastLoginDate=" + lastLoginDate + ",version=" + version + '}';
    }
}
```

Plik konfiguracyjny Hibernate będzie więc wyglądał następująco zakładając, że jako silnik bazy danych wykorzystamy Derby:

```java
public class GuiceConfig extends GuiceServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
       super.contextInitialized(servletContextEvent);
    }

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new GuiceModule(), new HibernateModule());
    }

    public static void main(String[] args){
        Injector injector = Guice.createInjector(new GuiceModule(), new HibernateModule());
        SessionFactory sf = injector.getInstance(SessionFactory.class);
    }
}

public class HibernateModule extends AbstractModule {

    @Override
    protected void configure() {
       bind(SessionFactory.class).toProvider(HibernateSessionFactoryProvider.class).in(Singleton.class);
    }
}

class HibernateSessionFactoryProvider implements Provider {

    public SessionFactory get() {
        Configuration configuration = new Configuration();
        configuration.setProperty("hibernate.dialect", "org.hibernate.dialect.DerbyDialect");
        configuration.setProperty("hibernate.connection.driver_class", "org.apache.derby.jdbc.ClientDriver");
        configuration.setProperty("hibernate.connection.url", "jdbc:derby://localhost:1527/sample");
        configuration.setProperty("hibernate.connection.username", "app");
        configuration.setProperty("hibernate.connection.password", "app");
        configuration.setProperty("hibernate.current_session_context_class", "thread");
        configuration.setProperty("hibernate.cache.provider_class", "org.hibernate.cache.NoCacheProvider");
        configuration.setProperty("hibernate.show_sql", "true");
        configuration.setProperty("hibernate.hbm2ddl.auto", "create-drop");

        configuration.addClass(Person.class);

        SessionFactory sf = configuration.buildSessionFactory();
        return sf;
    }
}
```

Razem z modułem naszej aplikacji dodajemy moduł, dzięki któremu dodamy obsługę bazy danych. Moduł ten umożliwia wstrzyknięcie w dowolne miejsce aplikacji implementacji SessionFactory, która w tym przypadku jest dostarczana przez Providera. Kod możemy przetestować bez konieczności uruchamiania serwera za pomocą pseudo klasy testującej:

```java
@Test
public void testingHibernateModule() {
    Injector injector = Guice.createInjector(new GuiceModule(), new HibernateModule());
    SessionFactory sf = injector.getInstance(SessionFactory.class);
}
```

Podczas uruchamiania zostanie rzucony następujący błąd:
```“Error in custom provider, org.hibernate.MappingNotFoundException: resource: pl/testing/client/Person.hbm.xml not found”```, który oznacza, że brakuje pliku mapującego.

Gdy konfigurowaliśmy Hibernate-a w linijce:

```java
configuration.addClass(Person.class);
```

przyjęliśmy, że będziemy korzystać z klasy Person a zgodnie z manualem: Programmatic configuration przy zastosowaniu takiej konfiguracji będzie wymagany plik mapujący nazywający się tak jak klasa i znajdujący się w tej samej lokalizacji (paczce) co klasa mapowana:

```xml
<!--?xml version="1.0" encoding="UTF-8"?-->
 ```

Po dodaniu pliku mapującego i uruchomieniu metody testującej schemat naszej bazy zostanie zaktualizowany a środowisko gotowe do wykorzystywania w modułowej aplikacji internetowej.