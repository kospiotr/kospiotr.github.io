---
layout: post
title:  "Google Web Toolkit + Guice"
description: "Instalacja, konfiguracja oraz zestawienie z Google Web Toolkit (in Polish)"
date:   2014-02-02 22:16:00
---
Guice jest frameworkiem dostarczającym tzn. wstrzykiwania zależności w naszej części serwerowej aplikacji.
Gdybyśmy rozważali aplikację typu desktop poniższa konfiguracja w zupełności by wystarczyła:

```java
package testingguice;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;

public class Main {

    public static void main(String[] args) {
        Injector injector = Guice.createInjector(new MyModule());
        PersonDao personDao = injector.getInstance(PersonDao.class);
        for (Person person : personDao.getAll()) {
            System.out.println("Person: "+person);
        }
    }
}
```

Klasa modułu w rozumieniu IoC:

```java
public class MyModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(PersonDao.class).to(PersonDaoImpl.class);
    }
}
```

Interfejs przykładowego DAO dla klasy Person:

```java
public interface PersonDao {
    public List<Person> getAll();
}
```

Implementacja naszego interfejsu, którą dzięki IoC możemy w łatwy sposób podmienić na inną implementującą ten sam interfejs:

```java
public class PersonDaoImpl implements PersonDao{

    public List<Person> getAll() {
        ArrayList<Person> list = new ArrayList<Person>();
        list.add(new Person(1, "Jacek"));
        list.add(new Person(2, "Zbyszek"));
        list.add(new Person(3, "Piotrek"));
        return list;
    }
}
```

Przykładowe POJO wykorzystywane w DAO:

```java
public class Person {
    private int id;
    private String name;

    public Person() {
    }

    public Person(int id, String name) {
        this.id = id;
        this.name = name;
    }

    ...

    @Override
    public String toString() {
        return "Person{" + "id=" + id + ",name=" + name + '}';
    }

}
```

My jednak korzystamy z aplikacji JEE, z którą nie jest aż tak łatwo. Aplikacja, która jest deployowana na serwer przed pierwszym wywołaniem strony ładującej powinna zostać zainicjonowana, co zostało zrobione w przypadku aplikacji desktopowej tu:

```java
Injector injector = Guice.createInjector(new MyModule());
```

W aplikacji typu web za pomocą małego wpisu w web.xml:

```xml
<listener>
  <listener-class>pl.testing.server.GuiceServletConfig</listener-class>
</listener>
```

sprawiamy, że zaraz po zdeployowaniu aplikacji zostanie od razu wywołana wskazana klasa dziedzicząca po ContextListener. Wykorzystamy ten fakt do zainicjonowania naszego injectora. W tym przypadku będziemy posiłkować się dodatkowo klasą GuiceServletContextListener, która wspomaga nas i odciąża tak, że wszystko co musimy zrobić to zwrócić injector:

```java
public class MainGuiceServletContextListener extends GuiceServletContextListener {

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new MainGuiceModule());
    }
}
```

Resztą tzn. pobieraniem instancji z injectora zajmie się specjalnie przygotowany przez nas w web.xml filtr:

```xml
  <filter>
    <filter-name>guiceFilter</filter-name>
    <filter-class>com.google.inject.servlet.GuiceFilter</filter-class>
  </filter>

  <filter-mapping>
    <filter-name>guiceFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

Jest to następna sztuczka wykorzystywana przez Guice’a. Gdybyśmy nie wykorzystali filtra każdorazowo gdy żądamy zawartości serwleta zostałaby stworzona instancja serwleta uruchomiona i zwrócony efekt jego przetwarzania. Natomiast wykorzystując filtr jesteśmy w stanie do wybranych (najczęściej dla wszystkich) serwletów wstrzyknąć odpowiednie zależności konfiguracyjne.

Konfigurując moduł w następujący sposób mapujemy wywołanie adresu: /examplexmlrpc z ExampleRpcImpl.class:

```java
public class GuiceModule extends ServletModule{

    @Override
    protected void configureServlets() {
        super.configureServlets();
        serve("/examplerpc").with(ExampleRpcImpl.class);

    }
}
```

Jest to dokładnie odpowiednik wpisu w web.xml:

```xml
    <servlet>
        <servlet-name>ExampleRpc</servlet-name>
        <servlet-class>pl.testing.server.ExampleRpcImpl</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>ExampleRpc</servlet-name>
        <url-pattern>/pl.testing.Main/examplerpc</url-pattern>
    </servlet-mapping>
```

Dzięki powyższemu zastąpieniu uzyskujemy zdecydowanie bardziej przyjazną konfigurację programiście. Dzięki temu rozwiązaniu możemy wykorzystać pełen potencjał naszego IDE i zapisywać bezbłędnie konfigurację przy pomocy autosugestii. W podobny sposób możemy nie tylko mapować serwlety, ale również i filtry. W praktyce większość konfiguracji może zostać przeniesiona z web.xml-a do odpowiednich modułów Guice-a. Na tym jednak nie koniec. Obecny stan wymaga podczas tworzenia połączenia GwtRpc następującego zapisu:

Część kliencka:

```java
@RemoteServiceRelativePath("../examplerpc")
public interface ExampleRpc extends RemoteService {
    public String myMethod(String s);
}

public interface ExampleRpcAsync {
    public void myMethod(String s, AsyncCallback<String> callback);
}
```

I część serwerowa:

```java
@Singleton
public class ExampleRpcImpl extends RemoteServiceServlet implements ExampleRpc {
    public String myMethod(String s) {
        return "Server says: " + s;
    }
}
```

Jak widać w synchronicznym interfejsie nadal występuje niebezpieczeństwo pomyłki i konieczności zapamiętywania mapowania:
```@RemoteServiceRelativePath(“../examplerpc”)```

Dzięki kolejnej sztuczce wyeliminujemy i ten “boilerplate code” – kod narażony/narażający na pomyłki. Dodajemy w części serwerowej klasę:

```java
@Singleton
public class GuiceRemoteServiceServlet extends RemoteServiceServlet {

    @Inject
    private Injector injector;

    @Override
    public String processCall(String payload) throws SerializationException {
        try {
            RPCRequest req = RPC.decodeRequest(payload, null, this);
            RemoteService service = (RemoteService) injector.getInstance(req.getMethod().getDeclaringClass());
            return RPC.invokeAndEncodeResponse(service, req.getMethod(), req.getParameters(), req.getSerializationPolicy());
        } catch (IncompatibleRemoteServiceException ex) {
            log("IncompatibleRemoteServiceException in the processCall(String) method.", ex);
            return RPC.encodeResponseForFailure(null, ex);
        }
    }
}
```

Jest to pośredniczący serwlet, dzięki któremu mapowanie urla na klasę serwleta zostanie zastąpione na bardzo dobrze znane i lubiane mapowanie konfiguracyjne tj. interfejsu na jego implementację. Rozwiązanie to zaproponował Eric Burke na łamach swojego bloga, które zdobyło ogromne uznanie wśród developerów GWT. W naszym przypadku osiągnęliśmy bardzo ciekawy efekt, mianowicie mapujemy interfej będący elementem części klienckiej na implementację serwerową.

Nasz plik konfiguracyjny w tym momencie wygląda następująco:

```java
public class GuiceModule extends ServletModule{

    @Override
    protected void configureServlets() {
        super.configureServlets();
        serve("/GWT.rpc").with(GuiceRemoteServiceServlet.class);
        bind(ExampleRpc.class).to(ExampleRpcImpl.class);
    }
}
```

Jak widać obsługujemy “/GWT.rpc” za pomocą GuiceRemoteServiceServlet.class, który jest tak naprawdę naszym dispatcherem, czyli klasą delegującą. Oznacza to, że GuiceRemoteServiceServlet.class kontroluje ruch. Gdy po stronie klienckiej zostanie wywołany serwlet za pomocą urla: “/GWT.rpc” zostanie wywołany właśnie nasz dispatcher. Wywołanie jest dekodowane:

```java
RPCRequest req = RPC.decodeRequest(payload, null, this);
```

a następnie pobierana jest klasa wywołująca servlet:

```java
req.getMethod().getDeclaringClass()
```

na podstawie której poprzez Injector otrzymujemy RemoteService, czyli klasę, z której musi dziedziczyć każdy servlet obsługujący GwtRPC. W naszym przypadku będzie to klasa, którą zbindowaliśmy z klasą wywołującą request. Dalsze linijki polegają na obsłudze samego wywołania oraz na zwróceniu odpowiedzi… ot i cała magia.
Należy pamiętać, że w części klienckiej będziemy używać teraz za każdym razem adnotacji aby wszystko chodziło jak należy:

```java
@RemoteServiceRelativePath("../GWT.rpc")
```

Dzięki zastosowaniu powyższej metody otrzymaliśmy mechanizm, który pozwoli na klarowne bo nie w xml-u oraz bezpieczne pisanie konfiguracji w oparciu o autosugestie. Ponadto jest on idealnym wstępem do stworzenia modularnej części serwerowej aplikacji wykorzystującej GWT, ale o tym dowiecie się z przyszłych postów.

Podsumowując konfigurację Guice-a powinniśmy otrzymać przykładowy zestaw klas po stronie klienckiej:

```java
@RemoteServiceRelativePath("../GWT.rpc")
public interface ExampleRpc extends RemoteService {
    public String myMethod(String s);
}

public interface ExampleRpcAsync {
    public void myMethod(String s, AsyncCallback<String> callback);
}
```

oraz zestaw plików po stronie serwerowej:

web.xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
    <listener>
        <listener-class>pl.testing.server.GuiceConfig</listener-class>
    </listener>
    <filter>
        <filter-name>guiceFilter</filter-name>
        <filter-class>com.google.inject.servlet.GuiceFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>guiceFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
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

```java
public class GuiceConfig extends GuiceServletContextListener {

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new GuiceModule());
    }
}

public class GuiceModule extends ServletModule{

    @Override
    protected void configureServlets() {
        super.configureServlets();
        serve("/GWT.rpc").with(GuiceRemoteServiceServlet.class);
        bind(ExampleRpc.class).to(ExampleRpcImpl.class);
    }
}

public class ExampleRpcImpl extends RemoteServiceServlet implements ExampleRpc {
    public String myMethod(String s) {
        return "Server says: " + s;
    }
}

@Singleton
public class GuiceRemoteServiceServlet extends RemoteServiceServlet {

    @Inject
    private Injector injector;

    @Override
    public String processCall(String payload) throws SerializationException {
        try {
            RPCRequest req = RPC.decodeRequest(payload, null, this);
            RemoteService service = (RemoteService) injector.getInstance(req.getMethod().getDeclaringClass());
            return RPC.invokeAndEncodeResponse(service, req.getMethod(), req.getParameters(), req.getSerializationPolicy());
        } catch (IncompatibleRemoteServiceException ex) {
            log("IncompatibleRemoteServiceException in the processCall(String) method.", ex);
            return RPC.encodeResponseForFailure(null, ex);
        }
    }
}
```

W tym miejscu zakończyliśmy konfigurację Guice-a wraz z GWT. W następnej części zajmiemy się obsługą Hibernate.