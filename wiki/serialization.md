---
layout: wiki
title: Serialization / Deserialization
comments: false
---
#GSON

```java
new com.google.gson.Gson().toJson(foo); //serialization
new com.google.gson.Gson().fromJson(jsonString, Foo.class); //deserialization

```
Reference: [https://sites.google.com/site/gson/gson-user-guide](https://sites.google.com/site/gson/gson-user-guide)
#FasterXml

```java
new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(var); //serialization
new com.fasterxml.jackson.databind.ObjectMapper().readValue(obj, MyObjectClass.class); //deserialization 
```