# Fitness app - assignment

## Requirements

- node.js ^12.14.0
- postgres ^11.5
- favourite IDE
- git

## Request

To localize response messages add *Accept-Language* header to request with *en* (default) or *sk* value.

## Routes

#### Authentication

- **POST /register** : Register user. Values of *email*, *password* and *role* are required. Values of *name*, *surname*, nickname and age are optional.
- **POST /login** : Log in user with *email* and *password* and generate JWT token. 

#### User

- **GET /users** : Retrieve list of users. Admins get all details and user just *id* and *nickname*.
- **GET /user/:id** : Retrieve user details.
- **PUT /user/:id** : Update user.
- **GET /user/:id/exercises** : Retrieve tracked exercises of user.
- **POST /user/:id/track** : Create tracked exercise. Values of *exerciseTime*, *duration*, *exerciseId* are required.
- **DELETE /user/:id/exercise/:trackedExerciseId** : Remove tracked exercise of user by id.

#### Exercises

- **GET /exercises** : Retrieve exercises. There is pagination with default limit 10 and query parameters *limit* and *page*. Filter by *id* of program with query *programID*. Fulltext search of exercise name with query *search*.
- **POST /exercise** : Create new exercise with values of *dificulty*, *name* and *programID*. 
- **PUT /exercise/:id** : Update exercise (*difficulty*, *name*).
- **DELETE /exercise/:id** : Remove exercise by *id*.

#### Programs

- **GET /programs** : Retrieve all programs.
- **POST /program/:id/exercises/:mode** : Update exercises of program by program id. Query parameter *mode* accepts strings *add* or *remove*. In body must be array *exerciseIds* with ids of exercises wanted to be assigned or unassigned for program.