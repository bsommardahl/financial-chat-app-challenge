# Backend

## Table of Contents

[Prerequisites](#prerequisites)

[Description](#description)

[Installation](#installation)

[Running the app](#running-the-app)

[Test](#test)

---

## Prerequisites

- Suggested Node Version: 12.x

- Local or Remote\* RabbitMQ instance

- Postgres instance

- Optional Docker (suggested with docker-compose)

\* Used [Cloudamqp](https://www.cloudamqp.com) on this project

## Description

Backend project, using Socket.io, to serve a websocket gateway for the financial chat app.

In charge of handling and storing users connecting/disconnecting to different chat rooms and exchanging messages. Handling on demand stocks quote requests and delegating it to a separate service using **_RabbitMQ_** as a message broker. Further, consuming the response message and sending it to the chat users.

## Installation

```bash
$ npm install
```

## Running the app

1. Before starting the application you should create a copy, (on the same directory) of [env sample file](.env.sample) and name it `.env`.
2. Reference the file to the required env variables in order to run the project.

```bash
# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Application runs on port 5000 by default. [http://localhost:5000](http://localhost:5000)

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
