# Task Management API

Base url:`https://task-management-api-r3rk.onrender.com`

Free instance servers on Render Cloud Hosting may experience spin-downs due to inactivity. As a result, the initial request after a period of inactivity may encounter some slowness as the server needs to spin up again.

## Description

Express API for managing tasks with CRUD endpoints and user authentication using JWT.

## Endpoints

### Tasks

#### Get Tasks

- `GET /api/tasks/:id`: Get all tasks for a user by ID.
- `GET /api/tasks/task/:id`: Get a single task by task ID.

#### Create Task

- `POST /api/tasks/`: Create a task. Include data in the request body:
  - title
  - content
  - user_id
  - completed
  - dueDate

#### Update Task

- `PUT /api/tasks/:id`: Update a task. Include ID in params and new data in the request body:
  - title
  - content
  - completed
  - dueDate

#### Delete Task

- `DELETE /api/tasks/:id`: Delete a task. Provide the task ID in the params.

### Users

#### Register

- `POST /api/users/register`: Register a new user. Include data in the request body (JSON):
  - username
  - email
  - password.

#### Login

- `POST /api/users/login`: Login to get access to protected routes. Successful login provides a JWT. Attach the JWT as authorization in the Headers of protected routes. JWT expires in 24 hours. Provide fields in request body:
  - email
  - password

#### User Information

- `GET /api/users/info`: Returns information about the current user. Requires the JWT from the login endpoint to be attached as authorization in the Headers.

#### Logout

- `POST /api/users/logout`: Blacklists the JWT token, preventing the user from using the same JWT for login again. Requires user to login again.
