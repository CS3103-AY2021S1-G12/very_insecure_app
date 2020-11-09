# A Dummy's Guide to Cybersecurity Excellence

## Group Members (CS3103 Group 12)

* Huang Weijie
* Keloysius Mak
* Lim Haw Jia
* Shawn Chew

## Overview

This is a deliberately vulnerable web application, created with the intention of teaching cybersecurity beginners the basics of XSS and Injection Attacks.

The live-hosted application can be found [here](http://very-secure-app.duckdns.org/)

## Quickstart

* If using Docker (recommended):

    1. Run `docker-compose up --build`

    2. Access the website at `localhost:80`

* Without Docker:

    1. Run a PostgreSQL database locally.

    2. Run `npm i` to install dependencies if it is the first time running the project.

    3. Run `npm run build`.

    4. Run the following command to start the server.

    ```bash
        PGUSER=<YOUR_POSTGRES_USER> \
        PGHOST=localhost \
        PGPASSWORD=<YOUR_POSTGRES_PASSWORD> \
        PGDATABASE=<YOUR_POSTGRES_DB> \
        PGPORT=<YOUR_POSTGRES_PORT> npm run start
    ```
