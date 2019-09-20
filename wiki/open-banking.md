---
layout: wiki
title: Open Banking
comments: false
toc: true
editurl: wiki/open-banking.md
---

# Drivers
## PSD2 ( Payment Services Directive 2 )
- Directive that applies to all Banks operating in the EU that regulates payment services
- Started January 2016 and deadline is January 2018
- Mandates Open Banking
- Banks have to provide APIs
- ASPSP - Account Servicing PSP, XS2A - must provide access to accounts
- TPP - Third party Payment Providers - banks must provide access about fe accounts to third party PSPs
  - PISP - Payment Initiation Services Provider
  - AISP - Account Information Serveces Provider
  - CAF - Confirmation on Availability of Funds
- RTS
- Open Banking API Clusters - there is no common european API, they are locally driven
- API Specification
  - API Definitions
  - Secured API invocation
  - API Usage Monitoring
- SCA - Strong Customer Authentication
  - 2 Factor Authentication (SMSOTP, FIDO, DUO, MePin)
  - Adaptive Authentication - for example when force 2FA like amount or frequency
  - Consent Management
  - PSP must authenticate customer based on 2FA: knowledge, possession, inherence
  - TPP must be regulated locally
  - TPP must be registered in a local registry
  - TPP must be certified
  - ASPSP Identify TPPs via qualified certificates - eIDAS
  - Exemptions:
    - Contactless <= 50EUR
    - UAT - parking / tolls
    - Payments <= 30EUR
    - Transaction Risk Assessment
- Incident Reporting
  - Security Incident Reporting - Transactions affected,server downtime,Economic Impact,Reputational Impact
  - Finding an Incident Anomaly Detection

## GDPR
 - protects individuals data

Terminology
- **Sandbox	Sandbox** in the context of this API means that the data returned by the API consists of example data. Its purpose is to mimic the current production and upcoming versions of the API. The sandbox API will always have the latest version of the API, meaning that all new versions appear in the sandbox before they are introduced into the production. Developers can create their own account and transaction data for use in the sandbox environment.
- **Resource Owner**	The Resource Owner refers to the bank customer who uses the Client (TPP application) and authorizes Client access to their accounts
- **Third Party Provider (TPP)**	Third-Party Provider (TPP) is the provider of one or more applications which the Resource Owner (customer) uses. TPP is the client/consumer of the API.
- **Client**	The Client refers to the consumer of the API, which is commonly a TPP application.
- **API Call**	API call is a request towards the API which receives a response. The API is by design stateless, and therefore it does not "remember" anything about previous requests, i.e., there is no session. Therefore every request made towards the API must contain certain headers so that the API can authenticate and authorize the Client.
- API Console	API Console is a tool on the API portal which lets users try out API calls in their web browser quickly.
- **Authentication**	Resource Owner (customer) Authentication: the process by which the Resource Owner identifies themselves to Nordea. Client (TPP Application) Authentication: the process which provides the correct identity of the Client; a key component in enforcing that Clients are only able to access only the resources that they are allowed to.
- **Access Authorization**	Access Authorization is the process through which the Client obtains permission to access the Resource Owner's data and services at the bank.
- **Access Scopes**	Access Scopes are part of the consent negotiated between the Resource Owner (customer) and the Client (TPP). Scopes dictate what data the Client can access and what services the Client is able to consume.
- **Consent**	Consent is agreed between the Resource Owner (customer) and the Client (TPP). It includes what data is to be shared, what services are to be performed on the Resource Owner's behalf, the duration and for what purpose. Once agreed, some of this information is used to start the Access Authorization flow through the Access Authorization API.
- **Production Version of the API**	The production version of the API refers to the actual release version of the API which this sandbox mimics. It will allow Clients to access the real banking data, with the Resource Owner's consent.
- **Access Token**	A token which is retrieved by the Client after successful Access Authorization flow. The access token is passed by the Client in all AIS and PIS API calls.
- **Refresh Token**	A token which is retrieved by the Client after successful Access Authorization flow. The refresh token is passed by the Client in Token Exchange call to obtain a new access token after access token duration has expired.
- **Authorization Code**	The authorization code (or 'auth code' for short) is a code provided to the Client during the Access Authorization flow; this code short-lived and exchanged for an access token.
Availability level	Availability tells in which part of the delivery lifecycle the given operation, parameter, model or property is.

# Resources
- https://www.youtube.com/watch?v=bYovaLTXjzo
- https://openbanking.wso2.com/
- https://developer.nordeaopenbanking.com/
