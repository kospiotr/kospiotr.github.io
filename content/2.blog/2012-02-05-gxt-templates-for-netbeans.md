---
layout: post
title:  "Szablony w Netbeans"
description: "Prezentacja możliwości szablonów w Netbeans na przykładzie tworzenia modyfikatorów dla GXT"
date:   2012-02-05 22:16:00
---
Podczas pracy z różnymi bibliotekami bywa, że pewne czynności są powtarzane nader często. Popularne biblioteki posiadają rozszerzenia, bądź natywne wsparcie ze strony IDE jak np. kreatory.
Niestety nie wszystkie biblioteki posiadają tak ogromne wsparcie jak choćby Spring czy Hibernate, co nie oznacza że są gorsze.
Programista jako użytkownik danej biblioteki pomimo braku wsparcia może jednak sam opracować pewne wzorce, które powtarzają się w trakcie pracy i je zautomatyzować poprzez makra czy też szablony. W dzisiejszym wpisie poświęcimy trochę czasu aby zautomatyzować tworzenie getterów i setterów dla modelu wykorzystywanego przez GXT.
Struktura modelu GXT wygląda nieco inaczej niż zwykłe POJO:

```java
package pl.bnsit.rssreader.shared;

import com.extjs.gxt.ui.client.data.BeanModel;

public class ExampleModelModel extends BeanModel{
    
    public static final String _NAME = "name";
    public static final String _URL = "url";
    public static final String _PROMOTED = "promoted";
    
    public String getName() {
        return get(_NAME);
    }

    public void setName(String name) {
        set(_NAME, name);
    }

    public String getUrl() {
        return get(_URL);
    }

    public void setUrl(String url) {
        set(_URL, url);
    }

    public Boolean getPromoted() {
        return get(_PROMOTED);
    }

    public void setPromoted(Boolean promoted) {
        set(_PROMOTED, promoted);
    }
    
}
```

Jak widać model ten posiada gettery i settery, ale różniące się sposobem przetrzymywania zmiennych. aby stworzyć powyższy plik ręcznie zajęłoby to programiście sporo czasu a przecież o to w pracy nie chodzi.
Z pomocą przychodzą nam szablony, dzięki którym za pomocą pewnej sekwencji znaków można wygenerować szablon, w którym należy uzupełnić elementy, które wyróżniają dany blok kodu.
Szablon stworzymy dla popularnego IDE – Netbeans, który posiada edytor szablonów w ```Tools->Options->Editor->Code Templates```.
Utwórzmy nowy szablon, który wywołamy za pomocą sekwencji ```gs``` i następującej treści:

```java
    public static final String _Property = "property_id";
    
    public String getProperty() {
        return get(_Property);
    }

    public void setProperty(String property_id) {
        set(_Property, property_id);
    }
```
	
Po zapisaniu można przetestować działanie wpisując w edytorze klasy gs a następnie wcisnąć klawisz TAB – tekst zapisany automatycznie się generuje. Nie jest to jednak zadowalający nas rezultat ponieważ pomimo wygenerowanego tekstu nazwy oraz typy należy poprawić. Aby mieć wpływ na elementy szablonu należy przedstawić elementy rozszerzające szablony:

 * ```${cursor}``` – definiuje pozycję karetki kursora po wygenerowaniu kodu,
 * ```${selection}``` – definuje pozycję wklejenia tekstu, który został zaznaczony; użycie tego znacznika spowoduje pojawianie się tego szablonu jedynie po zaznaczeniu pewnego fragmentu tekstu,
 * ```${ELEM newVarName default=”Property”}``` – definiuje nową zmienną ELEM o domyślnej wartości Property
 * ```${DEFTYPE leftSideType default=”Object”}``` – definiuje nowy zwracany typ danych w zmiennej DEFTYPE o domyślnej klasie Object
 * ```${INITTYPE rightSideType default=”Object”}``` – definiuje nowy inicjalizowany typ danych w zmiennej INITTYPE o domyślnej klasie Object
Powyższe zmienne to tylko dobry początek do tego aby zapoznać się z szerszą gamą typów, które można wykorzystywać w szablonach a w przypadku Netbeans-a jest to wspaniała kolekcja, która pozwala na tworzenie genialnych szablonów.

Ostatecznie dynamiczny szablon ma postać:

```java
    public static final String _${ELEM newVarName default="Property"} = "${ID newVarName default="id"}";
    
    public ${TYPE lefttSideType default="Object"} get${ELEM}() {
        return get(_${ELEM});
    }

    public void set${ELEM}(${TYPE} _input) {
        set(_${ELEM}, _input);
    }
```
	
Szablon wymaga do uzupełnienia:

 * nazwy pseudo pola,
 * identyfiakatora pola,
 * typu pola, po których można się przełączać za pomocą klawisza TAB.