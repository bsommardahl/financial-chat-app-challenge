# Microservice (Chat Bot)

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

- Optional Docker (suggested with docker-compose)

\* Used [Cloudamqp](https://www.cloudamqp.com) on this project

## Description

Microservice project in charge of consuming and producing messages from and to the message broker (**_RabbitMQ_**).

Messages include stock quote requests, furthermore, this microservice calls a foreign [API](https://stooq.com/q/l/?f=sd2t2ohlcv&h&e=csv&s=<stock_code>), parses the CSV received and sends it to the queue.

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

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
