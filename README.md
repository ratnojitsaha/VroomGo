# User Registration Endpoint

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname`: String, required, minimum 2 characters
- `fullname.lastname`: String, required, minimum 2 characters
- `email`: String, required, must be a valid email address
- `password`: String, required, minimum 6 characters

### Responses

| Status Code | Description                                      | Response Body Example                                  |
|-------------|--------------------------------------------------|--------------------------------------------------------|
| 201         | User registered successfully                     | `{ "token": "<jwt_token>", "user": { ...userData } }`  |
| 400         | Validation error (missing/invalid fields)        | `{ "errors": [ ... ] }`                                |
| 500         | Internal server error                            | `{ "error": "Internal Server Error" }`                 |

### Example Request

```http
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepassword"
}
```

### Example Success Response

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZiYmVlNzhlNWU1ZjQ3NGM2M2JjZDEiLCJpYXQiOjE3NTE4OTE2ODd9.tazRlVmGVTlj1R7UoPxMcRykhS_C1xGk0Jp7zuOFsw4",
    "user": {
        "fullname": {
            "firstname": "Subhadeep",
            "lastname": "Roy"
        },
        "email": "test01@gmail.com",
        "password": "$2b$10$hCMZHY7LqB8.HuT5MCYoTefMV06lZfaESe00dsOM3or3OrQ5nJIWG",
        "_id": "686bbee78e5e5f474c63bcd1",
        "__v": 0
    }
}
```
## Here the password is hashed using bcrypt.


----------------------------------------------------


## User Login Endpoint

### POST `/users/login`

Authenticates an existing user and returns a JWT token.

#### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

##### Field Requirements

- `email`: String, required, must be a valid email address
- `password`: String, required, minimum 6 characters

#### Responses

| Status Code | Description                                 | Response Body Example                                  |
|-------------|---------------------------------------------|--------------------------------------------------------|
| 200         | Login successful                            | `{ "token": "<jwt_token>", "user": { ...userData } }`  |
| 400         | Validation error (missing/invalid fields)   | `{ "errors": [ ... ] }`                                |
| 401         | Invalid email or password                   | `{ "message": "Invalid email or password" }`           |
| 500         | Internal server error                       | `{ "error": "Internal Server Error" }`                 |

#### Example Request

```http
POST /users/login
Content-Type: application/json

{
  "email": "alice.smith@example.com",
  "password": "securepassword"
}
```

#### Example Success Response

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZiYmVlNzhlNWU1ZjQ3NGM2M2JjZDEiLCJpYXQiOjE3NTIwNDg1MzZ9.EQ1nRQMwomfvIxIBPZgh7M6nT18gicVvTWDDRyHQ6x4",
    "user": {
        "fullname": {
            "firstname": "Subhadeep",
            "lastname": "Roy"
        },
        "_id": "686bbee78e5e5f474c63bcd1",
        "email": "test01@gmail.com",
        "password": "$2b$10$hCMZHY7LqB8.HuT5MCYoTefMV06lZfaESe00dsOM3or3OrQ5nJIWG",
        "__v": 0
    }
}
```

--------------------------------------------------

## User Profile Endpoint

### GET `/users/profile`

Returns the authenticated user's profile information.

#### Authentication

- Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Success                    | `{ "fullname": { ... }, "email": "...", ... }` |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }`     |

#### Example Request

```http
GET /users/profile
Authorization: Bearer <jwt_token> || Cookies : <jwt_token>
```

#### Example Success Response

```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "_id": "686bbee78e5e5f474c63bcd1"
}
```

----------------------------------------------

## User Logout Endpoint

### GET `/users/logout`

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

#### Authentication

- Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Logout successful          | `{ "message": "Logged Out" }`        |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }`     |

#### Example Request

```http
GET /users/logout
Authorization: Bearer <jwt_token> || Cookies : <jwt_token>
```

#### Example Success Response

```json
{
  "message": "Logged Out"
}


-----------------------



### Captain API Endpoints

## Captain Registration Endpoint

### POST `/captains/register`

Registers a new captain (driver) in the system.

#### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullname.firstname`: String, required, minimum 3 characters
- `fullname.lastname`: String, required, minimum 3 characters
- `email`: String, required, must be a valid email address
- `password`: String, required
- `vehicle.color`: String, required, minimum 3 characters
- `vehicle.plate`: String, required, minimum 3 characters
- `vehicle.capacity`: Number, required, minimum 1
- `vehicle.vehicleType`: String, required, one of `car`, `motorcycle`, `auto`

#### Responses

| Status Code | Description                                      | Response Body Example                                  |
|-------------|--------------------------------------------------|--------------------------------------------------------|
| 201         | Captain registered successfully                  | `{ "token": "<jwt_token>", "captain": { ...captainData } }`  |
| 400         | Validation error (missing/invalid fields)        | `{ "errors": [ ... ] }`                                |
| 400         | Captain already exists                           | `{ "message": "Captain already exist" }`               |
| 500         | Internal server error                            | `{ "error": "Internal Server Error" }`                 |

#### Example Request

```http
POST /captains/register
Content-Type: application/json

{
    "fullname" : {
        "firstname" : "Sudip",
        "lastname" : "Roy"
    },
    "email" : "captaintest1@gmail.com",
    "password" : "test_password",
    "vehicle" : {
        "color" : "black",
        "plate" : "WB72 4122",
        "capacity" : 3,
        "vehicleType" : "auto"
    }
}
```

#### Example Success Response

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZmYzU5OTYzMTBmNDIyODE3ZWViYzYiLCJpYXQiOjE3NTIxNTU1NDUsImV4cCI6MTc1MjI0MTk0NX0.VD-HqZqiEd4L3IwjlgES3Y6unt1tttdam3YdkEHrcoM",
    "captain": {
        "fullname": {
            "firstname": "Sudip",
            "lastname": "Roy"
        },
        "email": "captaintest1@gmail.com",
        "password": "$2b$10$9MAwYakqn9TMfe9nDqNmmOLvDPHRCwU8dMsEV7vQBsVYO5t.x8Sta",
        "status": "inactive",
        "vehicle": {
            "color": "black",
            "plate": "WB72 4122",
            "capacity": 3,
            "vehicleType": "auto"
        },
        "_id": "686fc5996310f422817eebc6",
        "__v": 0
    }
}


-----------------------

### Captain Login Endpoint

### POST `/captains/login`

Authenticates an existing captain and returns a JWT token.

#### Request Body

Send a JSON object with the following structure:

```json
{
    "email" : "captaintest1@gmail.com",
    "password" : "test_password"
}
```

##### Field Requirements

- `email`: String, required, must be a valid email address
- `password`: String, required, minimum 6 characters

#### Responses

| Status Code | Description                                 | Response Body Example                                  |
|-------------|---------------------------------------------|--------------------------------------------------------|
| 200         | Login successful                            | `{ "token": "<jwt_token>", "captain": { ...captainData } }`  |
| 400         | Validation error (missing/invalid fields)   | `{ "errors": [ ... ] }`                                |
| 401         | Invalid email or password                   | `{ "message": "Invalid email or password" }`           |
| 500         | Internal server error                       | `{ "error": "Internal Server Error" }`                 |

#### Example Request

```http
POST /captains/login
Content-Type: application/json

{
  "email": "captaintest1@gmail.com",
  "password": "test_password"
}
```

#### Example Success Response

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "fullname": {
            "firstname": "Sudip",
            "lastname": "Roy"
        },
        "email": "captaintest1@gmail.com",
        "status": "inactive",
        "vehicle": {
            "color": "black",
            "plate": "WB72 4122",
            "capacity": 3,
            "vehicleType": "auto"
        },
        "_id": "686fc5996310f422817eebc6"
    }
}
```

---

## Captain Profile Endpoint

### GET `/captains/profile`

Returns the authenticated captain's profile information.

#### Authentication

- Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Success                    | `{ "captain": { ...captainData } }`  |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }`     |

#### Example Request

```http
GET /captains/profile
Authorization: Bearer <jwt_token>
```

#### Example Success Response

```json
{
    "captain": {
        "fullname": {
            "firstname": "Sudip",
            "lastname": "Roy"
        },
        "vehicle": {
            "color": "black",
            "plate": "WB72 4122",
            "capacity": 3,
            "vehicleType": "auto"
        },
        "_id": "686fc5996310f422817eebc6",
        "email": "captaintest1@gmail.com",
        "status": "inactive",
        "__v": 0
    }
}
```

---

## Captain Logout Endpoint

### GET `/captains/logout`

Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie.

#### Authentication

- Requires a valid JWT token in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Logout successful          | `{ "message": "Logged out successfully" }`        |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }`     |

#### Example Request

```http
GET /captains/logout
Authorization: Bearer <jwt_token>
```

#### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```