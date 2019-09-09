---
layout: wiki
title: OAuth
comments: false
toc: true
editurl: wiki/oauth.md
---

# Parties
## Resource Owner
## Client Application
## Authorization Server
## Resource Server

# Clients
## Confidencial
It's able to protect client credentials confidently (web app)
It's communicating with authorization server via Back Channel
## Public Clients
It's not able to protect client credentials confidently which can be compromised or hijacked, cant ensure integrity of the client secrets (mobile application or java-script app in the browser)
It's communicating with authorization server via Front Channel

# Grand Types

## Client Credentials
### flow: 2-legged flow
Provides a client application way to access it's own service account
Phases:
- Client provides client credentials with Request Token
- Authorization server verifies if client credentials are correct
- Authorization server issues Access Token that allows for the access requested resource
- Client is using Access Token when requesting for the requested resource

## Resource Owner Credentials
### flow: 2-legged flow

## Implicit
### flow: 2-legged flow

## Authorization Code
### flow: 3-legged flow
