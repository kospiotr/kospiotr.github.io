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
  - Adaptive Authentication
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

# Resources
- https://www.youtube.com/watch?v=bYovaLTXjzo
