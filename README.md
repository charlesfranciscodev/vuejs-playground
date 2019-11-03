# Contact List

Contact List Web App with Bootstrap, Vue.js, Flask and SQLAlchemy.

## Features

### Home Route
* View an image gallery of all contacts.
* Sort contacts by first name or last name.
* General Search Bar which finds matches for first name, last name or email
* Each contact can be edited or deleted (with confirmation).
* The frontend route path is `/`.

### View Contact Route
* View the contact's full information.
  * First Name (text)
  * Last Name (text)
  * Email Address (text)
  * Birthdate (date and time)
  * Phone Number (text)
  * Avatar URL (text)
* The contact can be edited or deleted (with confirmation).
* The frontend route path is `/view/{:id}`.

### Edit Contact Route
* Edit the contact's full information.
* The frontend route path is `/edit/{:id}`.

### Create New Contact Route
* Create a new contact.
* The frontend route path is `/create`.

## API Routes
* **GET** `/api/contacts`
* **GET** `/api/contacts/{:id}`
* **POST** `/api/contacts`
* **PUT** `/api/contacts/{:id}`
* **DELETE** `/api/contacts/{:id}`

## Setup
To make the frontend app work, download vue and vue-router from a CDN:
* https://cdnjs.com/libraries/vue
* https://cdnjs.com/libraries/vue-router

Then, copy these files to the folder `./server/project/api/static/js/`

## Dependencies
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## Common Commands

### Build the images

`docker-compose -f docker-compose-dev.yml build`

### Run the containers

`docker-compose -f docker-compose-dev.yml up`

The client should be acessible at [http://localhost:80](http://localhost:80).

### Create the database

`docker-compose -f docker-compose-dev.yml exec server python manage.py recreate_db`

### Seed the database

`docker-compose -f docker-compose-dev.yml exec server python manage.py seed_db`

### Postgres

Want to access the database via psql?

```
docker-compose -f docker-compose-dev.yml exec database psql -U postgres
\connect db_dev
```

### Connect to the client

`docker-compose -f docker-compose-dev.yml exec client /bin/sh`

## References
* [Microservices with Docker and Flask](https://github.com/testdrivenio/testdriven-app-2.4)
* [Bootstrap](https://getbootstrap.com/)
* [Vue.js](https://vuejs.org/)
* [New in Vue: ES Module Browser Build](https://vuejsdevelopers.com/2019/02/04/vue-es-module-browser-build/)
* [Flask](https://palletsprojects.com/p/flask/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Random User Generator](https://randomuser.me/)
