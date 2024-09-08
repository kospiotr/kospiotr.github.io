---
title: OAuth
---

# Thesaurus
## OAuth 2.0
Specs: https://tools.ietf.org/html/rfc6749#section-1.4

OAuth2 is an open standard for authorization. Confusingly, OAuth2 is also the basis for OpenID Connect, which provides OpenID (authentication) on top of OAuth2 (authorization) for a more complete security solution.

## OpenID
OpenID is an open standard for authentication, promoted by the non-profit OpenID Foundation. As of March 2016, there are over a billion OpenID-enabled accounts on the internet, and organizations such as Google, WordPress, Yahoo, and PayPal use OpenId to authenticate users.

A user must obtain an OpenID account through an OpenID identity provider (for example, Google). The user will then use that account to sign into any website (the relying party) that accepts OpenID authentication (think YouTube or another site that accepts a Google account as a login). The OpenID standard provides a framework for the communication that must take place between the identity provider and the relying party.

## OpenID Connect
The latest version of OpenID is OpenID Connect, which combines OpenID authentication and OAuth2 authorization. (not OpenID 1 or OpenID 2–both previous versions have been deprecated!…) is a profile of OAuth 2.0 that defines a workflow for authentication. Other might be SAML.

## SAML
SAML is the oldest standard of the three, originally developed in 2001, with its most recent major update in 2005. SAML, pronounced “sam-el,” stands for Security Assertion Markup Language. It’s an open standard that provides both authentication and authorization.

## SSO
Single Sign On

# Comonents
## Resource Owner
## Client Application
## Authorization Server
## Resource Server
## Access token
## Refresh token
## Consent screen

# Clients

## Confidencial
It's able to protect client credentials confidently (web app)
It's communicating with authorization server via Back Channel

## Public Clients
It's not able to protect client credentials confidently which can be compromised or hijacked, cant ensure integrity of the client secrets (mobile application or java-script app in the browser)
It's communicating with authorization server via Front Channel

# Flows

## Types
### Client Credentials
* flow type: 2-legged flow
* used by: clients that are trusted for example on the trusted hardware
Provides a client application way to access it's own service account.

* Flow:
- Client provides client credentials with Request Token
- Authorization server verifies if client credentials are correct
- Authorization server issues Access Token that allows for the access requested resource
- Client is using Access Token when requesting for the requested resource

### Resource Owner Credentials (username-password authentication flow)
#### flow: 2-legged flow
* Used when user or resource owner has a trust relationship with the client.

Prerequisites:
- Client must be capable of obtaining the user's credentials for example via form on the front channel and store them securely.

Flow:
- Resource Owner provides his credentials (username and password) to the Client application
- Client application uses the user credentials to request an Access Token from the Authorization Server via request: POST /token, Authorization: Basic (client_id:secret), grant_type=PASSWORD&scope=resource&user_name=USER_NAME&password=PASSWORD
- Authorization server authenticates the client and receives the user credentials
- Authorization server if credentials are valid issues an access token to the client application and optionally can issue a refresh token as well

### Implicit
* flow type: 2-legged flow
* used when clients that are unverified source like third party applications

Prerequisites:
- Client must be able to display web page, for example web view or pop out in the browser
- Client must be registered in the authorization server

Flow:
- Resource owner needs access Resources from access Resource Server via Client
- Resource server requires authorization
- Client requests for the authorization to Authorization Server with HTTP request: GET /authorize?client_id=CLIENT_ID&scope=resource&redirect_uri=http://CALLBACK_URL&response_type=**token**&state=STATE_VAR
- Client receives Access Token directly via callback GET /cb#access_token=ACCESS_TOKEN&expires_in=3600&state=STATE_VAR
- Client is using Access Token on Resource Server with Authorization Bearer

Notes:
- Callback parameters are returned after URL hash instead question mark in order to consume it only locally not to send to any other server
- Is simplified version of Authorization Code but Authorization Code is not provided in this flow
- Access Token is exposed to the browser and local operating system so there are some securities concerns and is the most discussed flow among others
- Refresh Token are per spec forbidden to be returned to the Client
- There are many variations of this flow like using hidden iframes, persisting tokens in cookies

### Authorization Code
#### flow: 3-legged flow

## Choosing
![choosing alghoritm](/wiki/oauth/oauth-grants.svg?sanitize=true)

## Differences
Every OAuth2 grant type flow differs only in the first part of the main flow: *Get Token Acquisition*
In principle, the Get Access Token flow has 5 steps (as shown in the diagram below):

1. Pre-register Client (App) with OAuth Server to get Client ID/Client Secret
2. OAuth Server authenticates user when she clicks on the App’s social login button, which is tagged with Client ID
3. OAuth Server solicits user permission to allow the App to perform something on her behalf
4. OAuth Server sends secret Code to App
5. App acquires Key/Access Token from OAuth Server by presenting secret Code and Client Secret

![differences](/wiki/assets/oauth/OAuth-Flow-Comparison-1024x646.png)
