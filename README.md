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

    2. Apply the SQL in `db/schema.sql` to the Postgres database. The application will connect to the default `postgres` database.

    3. Run `npm i` to install dependencies if it is the first time running the project.

    4. Run `npm run build`.

    5. Run the following command to start the server.

    ```bash
        PGUSER=readonly_user \
        PGHOST=localhost \
        PGPASSWORD=very_insecure_password \
        PGDATABASE=postgres \
        PGPORT=<YOUR_POSTGRES_PORT> npm run start
    ```
