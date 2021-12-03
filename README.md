# Enterprise API

This is a example Restful API with ACL implementation. It provides a CRUD for Users and Posts with all kinds of authenticated routes. You can find out more in the documentation.

## Requirements

If you want to run it locally, you need [NodeJS](https://nodejs.org/en/) and either [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) installed to run it. If you have [Docker](https://docs.docker.com/engine/) and [docker-compose](https://docs.docker.com/compose/install/) installed, though, you can skip all those boring application-specific installation steps and go ahead with it.

## Running

With docker you just need to:

```bash
docker-compose up
```

Otherwise, fill the `.env` file with your local postgres settings:

```env
TYPEORM_HOST='localhost'
TYPEORM_USERNAME='username'
TYPEORM_PASSWORD='password'
TYPEORM_DATABASE='database'
TYPEORM_PORT=5432
```

Then:

```bash
yarn
yarn typeorm migration:run
yarn dev
```

## How to test

You can reach the Swagger documentation on path `/api/docs`. If you're already running on localhost, just click [here](http://localhost:3333/api/docs). You can start by reaching the `/login` route and filling the `Authorize` option in Swagger with the returned value, just like this:

```text
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AbWFpbC5jb20iLCJpYXQiOjE2Mzg1Mzg2MTIsImV4cCI6MTYzODYyNTAxMiwic3ViIjoiZjA2ZWVmZjctNzBjZC00MjJiLTkzZTYtYjM4MWZkZWExY2QxIn0.d7iESHjsLav3CElty7695w7OFVcdTwU0VmZqgrU3Ogc
```
