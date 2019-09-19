---
layout: wiki
title: API Management
comments: false
toc: false
editurl: api-management.md
---
API Management refers to the practices and tools that enable an organization to govern and monitor its Application Programming Interfaces (APIs). Today, the term almost always means management of RESTful APIs using the JSON language.

API Management controls how the gateway passes calls to the back-end service and then hands off the response back to the invoker site. Most large companies have built out APIs for their customers and for internal use. There is a choice to have the data on-premise or in the cloud, whichever works best for the situation.

API management tools typically allow for security policy definition and enforcement, including authentication and authorization of API consumers. They can throttle API calls and limit usage based on established SLAs and resource allocation agreements.

IT Central Station users are looking for a healthy API gateway that manages transformation engines to modify requests and responses in real time. Publishing tools report access and usage policies, and manage the API lifecycle. API Management is responsible for collecting data analytics and other metrics, and monitors load balancers and debugging, especially e-mail notifications, error logs and validation errors. Clients using APIs have access to better insights into their usage because APIs impact many products and services, and API Management is critical to agile operations.

IT Central Station users want ease of use in API Management for monitoring these security gateways against malicious attacks. Aspects most important to IT include Directory Authentication, API Security, Life Cycle Management, Deployment Management and Service Registry, discovery and a repository. There should be built in API Aggregation, Traffic Management, Mobile Optimization, HTTP Acceleration and Data Caching.

IT teams specifically look for API Management to oversee encryption, decryption, credential management, URL management and prevention against XSS and SQL Injection threats. API Management will monitor exposed functionality and monetization. API Management solutions are integral to a 24/7 need to keep everything running, and running well. Good planning and project management will help IT choose the best combination of monitoring tools for API Management.

# Features

## Security

### API Management roles
* Administrator - 
* Publisher - create API, list resources, metrics dashboards
* Subscriber - view documentation, explor & test API, register applications, request API Key, metrics dashboard

## Versioning
* Separate management
* Multiple versions support
* Lifecycle - Draft, Published, Deprecated, Retired
* Views - Public, Private, PArtner

## Analytics

## Documentation
* Contract first

## Operability
* Rate limiting
* Throttling
* Caching

## Testing
* Testing before publishing to production
* Notification: for subscribers about SLAs, approvals, deprecated APIs

## Portals
## SLAa
* availability (uptime vs deployment)
* response times (downstream systems vs data-lake)

# Components
eDMZ, iDMZ, DRN Gateway
zuul, ribbon, hystrix, zipkin
feign
* API Security modules: OpenAM, Apache Syncope, Gluu, midpoint, build own


# Platforms
Apigee, Mulesoft Anypoint Platform, Azure API Management, Kong, SnapLogic Enterprise Integration Cloud, WSO2 App Cloud, CA API Management, 3scale, Akana, SwaggerHub, Mashery, Postman, Oracle API Manager, Cloud Elements, Google Cloud Endpoints, Apiary, Dell Boomi, webMethods, Sentinet, Agama API, SAP Cloud Platform, AWS CloudTrail, Workato, RepreZen API Studio, ClearUI, Stoplight are some of the Top API Management Platforms

# Contract first vs Code first
https://swagger.io/blog/api-design/design-first-or-code-first-api-development/
There are advantages and disadvantages associated with both approaches, and at the end of the day, choosing the right approach boils down to your immediate technological and strategic needs that you wish to solve with your APIs.

## Contract first
The plan is converted to a human and machine readable contract, such as a Swagger document, from which the code is built.
* Pros
* Cons:
* When use:
  - When Developer Experience Matters
  - When Delivering Mission Critical APIs
  - When Ensuring Good Communication

## Code first
Based on the business plan, API is directly coded, from which a human or machine readable document, such as a Swagger document can be generated
* Pros:
  - Generated from existing classess
* Cons:
* When use:
  - When Delivery Speedy Matters
  - When Developing Internal APIs
