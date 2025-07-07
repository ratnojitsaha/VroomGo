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

---