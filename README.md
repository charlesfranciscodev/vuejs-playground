# Contact List

Contact List Web App with Vue.js, Bootstrap, Flask and SQLAlchemy

The goal of this project is to build a web app with Vue.js, without using a package manager (like npm), a transpiler (like Babel) or module bundler (like webpack).

## Features

### Home Page
* View an image gallery of all contacts.
* The frontend route path is `/` (link in the navbar).

### View Contact Page
* Each contact can be clicked to show a detailed view of the contact.
* Shows the contact's information.
  * Full Name
  * *Username*
  * Age
  * Email Address
  * Phone Number
  * Description
  * Avatar
  * **Project(s)**
* The frontend route path is `/view/{:id}`.

### Create New Contact Page
* Create a new contact.
* The frontend route path is `/create` (link in the navbar).

### Edit Contact Page
* Each contact can be edited from the home page or the detail view.
* Edit the contact's full information.
* The frontend route path is `/edit/{:id}`.

### Delete Contact
* Each contact can be deleted from the home page or the detail view.

### Login Page
* Login with username and password (display the current user in the navbar)
* Logout

### View Projects Page
* requires authentication
* View an image gallery of all projects the current user is assigned to.
* The frontend route path is `/projects` (link in the navbar).

### View Project Page
* requires authentication (only visible if the current user is assigned to the project)
* Each project can be clicked to show a detailed view of the project.
* Shows the project's information.
  * Name
  * **Platform(s)**
  * Release Date
  * Description
  * Website
  * Logo
* The frontend route path is `/project/{:id}`.

### Authentication
* [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) for password hashing in the backend.
* [JSON Web Tokens](https://jwt.io/) for storing the credentials in the frontend.

### Bonus
* Show a confirmation before deleting a contact.
* Display a warning message on the contact detail page when a contact is not assigned to any projects.
* Sort contacts on the home page by first name or last name.
* General Search Bar on the home page which finds matches for first name, last name or username.
* Allow the user to login with his email as well.

## API Routes

### Contacts
* **GET** `/api/contacts`
* **GET** `/api/contacts/{:id}`
* **POST** `/api/contacts`
* **PUT** `/api/contacts`
* **DELETE** `/api/contacts/{:id}`

### Projects
* **GET** `/api/projects/`
* **GET** `/api/projects/{:id}`

### Authentication
* **POST** `/login`

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

The client should be acessible at [http://localhost:5000](http://localhost:5000).

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

## Data
* [Random User Generator](https://randomuser.me/)
* [Diverse UI](https://diverseui.com/)
* [PlaceIMG](https://placeimg.com/)
