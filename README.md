oauth2-resource-server-example
==============================

[![Build Status](https://travis-ci.org/madarche/oauth2-resource-server-example.svg?branch=master)](https://travis-ci.org/madarche/oauth2-resource-server-example)

OAuth2 Resource Server (RS) example


Usage
-----

First, write the `config.tom` config file:

```shellsession
cp config.toml.example config.toml
vim config.toml
```

Then, install the needed packages and start the application:

```shellsession
npm ci
npm start
```


API
---

The API is defined in the
[openapi-schema.yml](src/openapi-schema.yml)
file.

