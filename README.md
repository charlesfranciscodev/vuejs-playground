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

### Authentication
* [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) for password hashing in the backend.
* [JSON Web Tokens](https://jwt.io/) for storing the credentials in the frontend.

### Login/Logout
* Login page with username and password (display the current user in the navbar)
* Logout from the navbar.

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

## Download Contacts Data as an Excel Sheet
* with [SheetJS](https://sheetjs.com/)
* with [pandas](https://pandas.pydata.org/)

## API Restrictions
* Unfortunately I had some issues with random people on the Internet messing up the data.
* For that reason, only an admin account can take actions that modify the data such as CREATE, UPDATE or DELETE.
* Only admins can create/update other admin accounts.

### Bonus
* Show a confirmation before deleting a contact.
* Display a warning message on the contact detail page when a contact is not assigned to any projects.
* Sort contacts on the home page by first name or last name.
* General Search Bar on the home page which finds matches for first name, last name or username.
* Allow the user to login with his email as well.
* If a user is trying to access a page that requires authentication and he is not allowed to view that page, show an error message.

## API Routes

### Contacts
* **GET** `/api/contacts`
* **GET** `/api/contacts/{:id}`
* **POST** `/api/contacts`
* **PUT** `/api/contacts`
* **DELETE** `/api/contacts/{:id}`

### Projects
* **GET** `/api/all-projects/`
* **GET** `/api/projects/`
* **GET** `/api/projects/{:id}`

### Authentication
* **POST** `/login`

## Frontend Setup
To make the frontend app work, download vue, vue-router and vuex (ES Module Browser Builds):
* https://cdnjs.com/libraries/vue
* https://cdnjs.com/libraries/vue-router
* https://cdnjs.com/libraries/vuex

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

### Connect to the server

`docker-compose -f docker-compose-dev.yml exec server /bin/sh`

## Deployment

* Sign up for [Heroku](https://signup.heroku.com/)
* Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Create a new app

`heroku create`

### Log in to the Heroku Container Registry

`heroku container:login`

### Provision a new Postgres database with the hobby-dev plan

`heroku addons:create heroku-postgresql:hobby-dev`

### Build the production image and tag it with the following format

```shell
cd server
docker build -f Dockerfile-prod -t registry.heroku.com/<app-name>/web .
```

where `<app-name>` is the name of the Heroku app

### Test Locally

`docker run --name test -e "PORT=8765" -p 5002:8765 registry.heroku.com/<app-name>/web:latest`

Now go to http://0.0.0.0:5002/api/test

Once done delete the container:

`docker rm test`

### Push the image to the registry

`docker push registry.heroku.com/<app-name>/web:latest`

### Release the image

`heroku container:release web`

You should now see the app at

https://app-name.herokuapp.com/

where app-name is the name of the Heroku app

### Database Setup

```shell
heroku run python manage.py recreate_db
heroku run python manage.py seed_db
```

Now go to https://app-name.herokuapp.com/api/contacts

## References
* [Test-Driven Development with Python, Flask, and Docker](https://testdriven.io/courses/tdd-flask/)
* [Vue.js](https://vuejs.org/)
* [New in Vue: ES Module Browser Build](https://vuejsdevelopers.com/2019/02/04/vue-es-module-browser-build/)
* [Bootstrap](https://getbootstrap.com/)
* [Flask](https://palletsprojects.com/p/flask/)
* [SQLAlchemy](https://www.sqlalchemy.org/)

## Data
* [Random User Generator](https://randomuser.me/)
* [Diverse UI](https://diverseui.com/)
* [PlaceIMG](https://placeimg.com/)
