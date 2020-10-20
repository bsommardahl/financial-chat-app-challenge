# Frontend

## Table of Contents

[Prerequisites](#prerequisites)

[Description](#description)

[Installation](#installation)

[Running the app](#running-the-app)

---

## Prerequisites

- Suggested Node Version: 12.x

- Backend server running

- [Firebase](https://firebase.google.com/) application (Google authentication enabled)

- Optional Docker (suggested with docker-compose)

## Description

Frontend React Application, using Socket.io, to connect to the financial chat app.

Handle user authentication with firebase.

To request a stock quote to the backend, send a message containing `/stock=aapl.us` where `aapl.us` is the stock code you want to request.

## Installation

```bash
$ npm install
```

## Running the app

1. Before starting the application you should create a copy, (on the same directory) of [env sample file](.env.sample) and name it `.env`.
2. Reference the file to the required env variables in order to run the project.

```bash
$ npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
