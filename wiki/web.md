---
layout: wiki
title: Web
comments: false
toc: true
editurl: wiki/web.md
---

# HTTP API Design
Here are some things I consider when designing a web API.

* Consider using the following response code:
 * 200 – OK
 * 400 – Bad Request
 * 500 – Internal Server Error
 * 401 – Unauthorized (i.e. authentication error)
 * 403 – Forbidden (i.e. not authorized)
 * 404 – Not Found
* Version your API
* Use limit and offset for pagination
* Return JSON responses by default with camel case property names
* Append extension to URL to indicate other types (e.g. /person/123.xml)
* Host APIs off a subdomain like api.yelp.com
* Use OAuth 2.0 for authentication
* Pretty print the results by default

# Tools

```curl –HAccept:application/json http://localhost:8080/Jersey/rest/contacts```
```curl -X PUT -HContent-type:application/xml --data "<contact><id>foo</id><name>bar</name></contact>" http://localhost:8080/Jersey/rest/contacts/foo```