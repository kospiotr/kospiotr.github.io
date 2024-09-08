---
layout: post
title:  "Aktualizacja web.xml dla Netbeans"
description: "Wprowadzenie zmian w deskrypotrze wdrożenia w celu wyeliminowania błędów w Netbeans"
date:   2012-02-04 22:16:00
---
Tworząc nowy projekt czy to za pomocą kreatora dołączonego do IDE czy za pomocą archetypu Maven zdarza się, że utworzona wersja deskryptora wdrożenia jest dość nieaktualna.
Pracując z Netbeans chcąc dodać nowy servlet jeżeli deskryptor będzie w wersji 2.3 bądź starszej, zostaniemy poinformowani komunikatem, że nie jest to możliwe:

![](/posts/assets/netbeans-web-xml-update.jpg)
W tym celu należy w pliku ```web.xml``` skasować dotychczasowy schemat walidacji DTD:

```xml
<!DOCTYPE web-app
   PUBLIC "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
   "http://java.sun.com/dtd/web-app_2_3.dtd">
```

a następnie dodać nowy schemat walidacji XSD w głównym elemencie pliku xml:

```xml
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="http://java.sun.com/xml/ns/javaee"
        xmlns:web="http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
        xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
        version="2.4">
```

Od tej pory można bez przeszkód dodawać servlety przez wspomniany kreator.