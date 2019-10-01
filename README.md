# Rock, Paper, Scissors Game

## Overview
Fron end to play Rock, Paper, Scissors game

## Requirements
To build it:

- Node 8.5+
- NPM 5.3+

If you want to launch it in local you can launch it using those npm commands:

First one install all dependencies with:
 
``` npm install ```

After that launch:

``` npm start ```

By default, application will be launched in:

``` http://localhost:3000/ ```

And it's configured for development environment to use REST API in this HOST:

``` http://localhost:8080/ ```

But it's configurable using `.env` files.

```
.env.development
.env.production
.env.test
```

## Scripts

There are configured several launchers that could be used:

* Install all dependencies.
``` npm install ``` 
* Start application
``` npm start ```
* Execute unit tests
``` npm test ```
* Execute E2E tests (it needs application and REST API running)
``` npm run wdio ```
