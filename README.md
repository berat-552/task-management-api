# Task Management API

## Rate Limits

- **Requests Per Hour**: 1000 requests per hour per IP address.

## Handling Rate Limiting Responses

When a client exceeds the rate limit, the API will respond with a status code of `429 Too Many Requests` and include a JSON response in the following format:

```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

---

## Description

Express API for managing tasks with CRUD endpoints and user authentication using JWT.

## Endpoints

### Users

#### Register

- `POST /api/v1/auth/register`: Register a new user. Include data in the request body:
  - username
  - email
  - password.

---

#### Login

**Protected (Only registered users can access this route)**

- `POST /api/v1/auth/login`: Login to get access to protected routes. Successful login provides a JWT. Attach the JWT as authorization in the Headers of protected routes. JWT expires in 24 hours. Provide fields in the request body:
  - email
  - password

---

#### User Information

**Protected (Requires JWT as Authorization in Headers)**

- `GET /api/v1/auth/info`: Returns information about the current user. Requires the JWT from the login endpoint to be attached as authorization in the Headers.

---

#### Logout

**Protected (Requires JWT as Authorization in Headers)**

- `POST /api/v1/auth/logout`: Blacklists the JWT token that needs to be attached in authorization Headers, preventing the user from using the same JWT for login again. Requires the user to login again to receive a new token that is not blacklisted.

---

#### Delete Account

**Protected (Requires JWT as Authorization in Headers)**

- `POST /api/v1/auth/delete`: Deletes user account. Requires the JWT token that needs to be attached in authorization headers.

---

### Tasks (Protected Routes, Requires JWT as Authorization)

#### Get Tasks

- `GET /api/v1/tasks/:id`: Retrieve all tasks for a user by ID.
- `GET /api/v1/tasks/task/:id`: Retrieve a single task by task ID.
- `GET /api/v1/tasks/:id/:qty`: Retrieve a specified number of tasks for a user.
- `GET /api/v1/tasks/search/:id?q=ExampleQuery`: Retrieve tasks for a user that match query param.`

---

#### Create Task

- `POST /api/v1/tasks/`: Create a task. Include data in the request body:
  - title
  - content
  - user_id
  - completed
  - dueDate
  - priority ("High", "Medium", "Low")

---

#### Update Task

- `PUT /api/v1/tasks/:id`: Update a task. Include ID in params and new data in the request body:
  - title
  - content
  - completed
  - dueDate
  - priority ("High", "Medium", "Low")

---

#### Delete Task

- `DELETE /api/v1/tasks/:id`: Delete a task. Provide the task ID in the params.
