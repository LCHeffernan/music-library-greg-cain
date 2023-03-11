# Music Library

A project created as part of my studies with [Command Shift](https://www.commandshift.co/). In this project I'll be learning about database design, SQL, postgres and CRUD Operations.

## Roadmap

- follow track

  \*note that there may be a delay as I'll be moving house during this project 🙃

## Installation and how to use

1. Install docker onto your machine
2. In your terminal `<remove and change before entering>`

   ```cli
   docker run --name postgres -p <portNumber>:<portNumber> -e POSTGRES_PASSWORD=<yourPassword> -d postgres
   ```

   This pulls and runs a postgres image needed to create a database. You'll also need to create .env and .env.test to load in environment variables for the database.

   ```
   PGUSER=<user>
   PGHOST=localhost
   PGPASSWORD=<yourPassword>
   PGDATABASE=<nameOfDatabase>
   PGPORT=<pg portNumber>
   PORT=<port>
   ```

3. cd into the repo locally on your machine and initialise it with:

   ```
   npm init
   ```

4. Start the API with:

   ```
   npm start
   ```

5. In your browser type:

   ```
   localhost:<port you set in .env>/swagger/
   ```

6. You should now be able to see a breakdown of all the routes and be able to interact with the API!

   ![1678484626902](image/README/1678484626902.png)

## Application dependencies

```
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.9.0",
    "postgres-migrations": "^5.3.0",
    "sequelize": "^6.28.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.2"
  }
```

## Support

Thank you to all the support from tutors and fellow coursemates at Command Shift 🙌

## Authors and acknowledgment

[codegregcode](https://github.com/codegregcode)
