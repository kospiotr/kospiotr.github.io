---
title: API Management
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
* When use:
  - **When Developer Experience Matters**
  A well designed API can do wonders for the adoption and consumption of your APIs, and good design can be better achieved with the Design First approach. If your API strategy involves high adoption of your API and retention of users integrating with your API, then good Developers Experience (DX) matters. An effective API design helps your end consumers quickly understand your API’s resources and value propositions, reducing the time taken for them to integrate with your API. An API with consistent design decreases the learning curve when integrating with your API, making it more likely to have higher reuse value and engagement.
  - **When Delivering Mission Critical APIs**
  The biggest reason to go for the Design First approach is when your API’s target audience are external customers or partners. In such a case, your API is a key distribution channel that your end customers can use to consume the services you provide, and good design plays a key role in determining customer satisfaction. Such APIs play a critical role in representing your organization’s services, especially in an omni-channel ecosystem, where consistency in information and hassle-free consumption is an important indicator of business success.
  - **When Ensuring Good Communication**
  The API contract can act as the central draft that keeps all your team members aligned on what your API’s objectives are, and how your API’s resources are exposed. Identifying bugs and issues in the API’s architecture with your team becomes easier from inspecting a human-readable design. Spotting issues in the design, before writing any code is a much more efficient and streamlined approach, than doing so after the implementation is already in place.
  - **When Break A Monolithic to Micorservices**
  When you are breaking a big monolithic application into microservices, you need to design the contracts between each services so that separate teams can work on these services independently in order to increase productivity. The contract will help teams in communication and ensure that the developed services can be integrated together.
  - **When Using Non-REST API**
  When people are talking about design first or code first, they are talking about REST APIs as most REST API frameworks provide some sort of document generation from the code. If you are building your API with GraphQL or RPC, then there is no choose. You have to write the schema or proto files and a good framework will help you to scaffolding the project from the contract.
  - **When You Want To User the API Spec as Interface Agreement Document**
  Most enterprises will adopt API specification as Interface Agreement document or make it part of the IA so that you don’t need to describe the interface in Word or Excel document. The traditional way that developers read Word or Excel document and convert requirement into code is long gone as there are a lot of misunderstandings in natural language to describe the API. Specifications are designed to clearly describe the contract for both human and computer and it is a live document which is always in sync with code if design first is adopted.
  - **When The Chosen Framework Provide A Code Generator**
  It make perfect sense to create the specification first and then use a code generator to scaffold the project. It saves a lot of time to start a project from scratch and copy/modify existing project might introduce some bugs very hard to detected. Most of the generators will offer features to re- generate the code with the same specification as the framework has been upgraded to a new version. Even the specification has been changed, you can still generate a new project and then to a full text comparison with the old codebase to merge your code into the new project.
  - **When The Framework Can Leverage The Spec During Runtime**
  Some of the frameworks like light-rest-4j, light-graphql-4j and light-hybrid-4j can load the specification during runtime and use it for request validation and scope verification based on JWT tokens. In this case, the contract is not just for code generation but it is part of the application to enforce the contract during the runtime.
  - **When You Want Consumer To Work In Parallel**
  Another benefit of design first is that you can have the specification to generate the code with examples defined for each endpoint. After the code generation, you will have a running mock API that you can dockerized and deliver to the consumer team to be worked with. This can facilitate consumer and provider to work in parallel with maximum productivity. During the interaction, the consumer teams might give us feedback quickly to iterate the API design and then redelivery the new image to the consumer.
  - **When You Have Marketplace To Publish APIs**
  If you have a marketplace deployed in your organization, the API designed can be published to it as soon as the first draft is release. This will attract potential consumers and other teams to be involved with API design in a very early stage. And the feedbacks from these reviewers will greatly help with the API design team to stablize the contract.
  - **When You Adopt Consumer Driven Design**
  Some of the organization adopt the consumer driven contract design which means all potential consumers will be engage and asked to provide requirement about the API interface, the provider interface will be an aggregation of all potential consumers requirement. Sometime, as provider has more knowledge about the data and business domain, they might provide more features than all consumers asked for. The design specification is the crucial piece in the communication between team in this case.
  - **When Your Test Team Is Working In Parallel**
  In order to deliver microservices to production as fast as possible, we need to have CI/CD pipeline to be built in the DevOps tool chain and unit tests, integration tests, consumer contract tests and end-to-end tests are very important ensure the quality of the service and give management confidence to continuous integration to production. In order to engage QA team as early as possible, a detailed design specification is a must. If you want to engage QA team after you complete your coding, it will be too late.
  
## Code first
Based on the business plan, API is directly coded, from which a human or machine readable document, such as a Swagger document can be generated
* When use:
  - **When Delivery Speedy Matters**
  - **When Developing Internal APIs**
  - **When Delivery Small Independent REST API**
  When you are working on a single REST API and it is very simple, sometime, you can skip the design and start coding immediately. Once the code is done, you can generate the OpenAPI specification form the code or write it just like a documentation for consumers. In most of the cases, you are going to pick up an existing example project and then make some modification on top of it. For big APIs, we might not see some of the design flaws early enough and they may appear only after one or two versions are released to production.
  - **When The API Framework Doesn’t Support Code Generation**
  When the chosen API framework doesn’t provide a code generator, it make sense to write the code first and chances are there is a document generator to generate the specification from comment and annotations in the code. Even thought you have produce the design document, developer still need to read the design and translate it into the code.
