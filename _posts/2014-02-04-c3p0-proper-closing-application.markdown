---
layout: post
title:  "C3P0 - poprawne zamykanie"
description: "Naprawa zamykania puli (in Polish)"
date:   2014-02-04 22:16:00
---

W przypadku, gdy aplikacja do przechowywania danych wykorzystuje relacyjną bazę danych bardzo często się zdarza, że korzysta z takich narzędzi wspomagających jak Hibernate czy MyBatis (określenie “narzędzie” jest tu celowe, ponieważ najczęściej o tej warstwie mówi się skrótowo ORM, przy czym MyBatis ORM-em nie jest).

Biblioteki te (jak i również inne) mogą wykorzystywać zewnętrzne mechanizmy transakcji, czy zarządzania źródłami danych i tu zmierzam do C3P0.

C3p0 jest biblioteką, która wnosi warstwę obsługi wielu połączeń z bazą danych. W skrócie: gdy klient/usługa chce pobrać dane z bazy połączenie z bazą danych zostaje zajęte przez sesję klienta, które zwalniane jest dopiero po przetworzeniu i zwróceniu wyników. W przypadku, gdy wielu klientów chce naraz pobrać dane jeden użytkownik okupuje połączenie a pozostali czekają w kolejce dopóki się nie zwolni. Biorąc pod uwagę skalę, czyli duża ilość użytkowników korzysta z aplikacji, która wykonuje skomplikowane, powolne zapytania na dużej bazie danych może to być niewątpliwie spory problem.

C3P0 pozwala na wprowadzenie większej ilości niezależnych połączeń do bazy – taka wielowątkowość dla wątków :-).

Więcej informacji na ten temat można znaleźć na stronie projektu: http://sourceforge.net/projects/c3p0/ bądź na stronach bibliotek wykorzystujących C3P0.

Dzisiaj jednak zgodnie z tytułem zajmiemy się problemem, który może stanowić o stabilnej pracy naszej aplikacji. Gdy już przekonamy się do korzystania z biblioteki problem pojawia się podczas undeployingu na bazie Tomcat. Biblioteka nie zamyka i wyrejestrowuje nawiązanych połączeń. Podczas próby ponownego umieszczenia projektu na serwerze mogą pojawić się problemy, ponieważ niektóre klasy pozostają w pamięci. W ostateczności może nie dojść do poprawnego umieszczenia aplikacji. Od wersji 6.9 Tomcata została zaaplikowana usługa retrospekcji dla wybranych klas, co pozwala wyrejestrować je automatycznie przez kontener, ale z doświadczenia zauważyłem, że nie dzieje się to za każdym razem. Rozwiązaniem może być ręczne pozamykanie połączeń, które wywołamy w momencie gdy serwer jest zatrzymywany. Służy do tego listener który dodajemy w web.xml:

```xml
<listener>
    <listener-class>pl.xperios.rdk.server.startup.ServerStarter</listener-class>
</listener>
```

Poniżej znajduje się implementacja zamykania wszystkich połączeń dla C3p0, którą należy umieścić w listenerze Tomcata. Przykład:

 

```java
public abstract class MainServerModuleManager implements EventListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        ...
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

        try {
            connection = dataSource.getConnection();
        } catch (SQLException ex) {
        } finally {
            try {
                if (connection != null) {
                connection.close();
            }

            if (dataSource != null) {
                try {
                    DataSources.destroy(dataSource);
                    dataSource = null;
                } catch (Exception e) {
                }
            }
            } catch (SQLException sQLException) {
            }
        }
    }
}
```
