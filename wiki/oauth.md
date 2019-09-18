---
layout: wiki
title: OAuth
comments: false
toc: true
editurl: wiki/oauth.md
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

# Clients
## Confidencial
It's able to protect client credentials confidently (web app)
It's communicating with authorization server via Back Channel
## Public Clients
It's not able to protect client credentials confidently which can be compromised or hijacked, cant ensure integrity of the client secrets (mobile application or java-script app in the browser)
It's communicating with authorization server via Front Channel

# Grand Types

![choosing alghoritm](https://raw.githubusercontent.com/kospiotr/kospiotr.github.io/master/resources/wiki/oauth/oauth-grants.svg?sanitize=true)
![differences](https://raw.githubusercontent.com/kospiotr/kospiotr.github.io/master/resources/wiki/oauth/OAuth-Flow-Comparison-1024x646.png)

## Client Credentials
### flow: 2-legged flow
Provides a client application way to access it's own service account.

Phases:
- Client provides client credentials with Request Token
- Authorization server verifies if client credentials are correct
- Authorization server issues Access Token that allows for the access requested resource
- Client is using Access Token when requesting for the requested resource

## Resource Owner Credentials (username-password authentication flow)
### flow: 2-legged flow
Used when user or resource owner has a trust relationship with the client. The client must be capable of obtaining the user's credentials for example via form on the front channel.

Phases:
- Resource owner (end user) provides his username and password to the client application
- The client application uses the user credentials to request an access token from the authorization server
- Authorization server authenticates the client and receives the user credentials
- Authorization server if credentials are valid issues an access token to the client application and optionally can issue a refresh token as well

## Implicit
### flow: 2-legged flow

## Authorization Code
### flow: 3-legged flow
