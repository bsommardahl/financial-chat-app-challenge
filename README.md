## NodeJs/Typescript Challenge

### Financial Chat

#### Author: Renán Zelaya

---

## Table of Contents

[Description](#description)

[Instructions to run](#instructions-to-run)

[Running the app](#running-the-app)

---

## Description

This repository, written using Typescript, contains a React application that connects to a NestJS Backend application that produces messages to a RabbitMQ queue where a NestJS Microservice consumes and processes stock quote requests to display on the chat.

## Instructions to run

Each project has their own set of descriptions as well as instructions to run them.

- [Frontend Description and Instructions](./frontend/Readme.md)
- [Backend Description and Instructions](backend/Readme.md)
- [Microservice Description and Instructions](Microservice/Readme.md)

## Running the app

Once you have each project setup as specified and you prefer to use docker, you could run the command

```bash
docker-compose up
```

And wait for the containers to build, and enjoy using the application.
