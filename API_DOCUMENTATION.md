# API Documentation - Claim Processing System

## 🔗 Quick Access Links
- **Application URL**: http://localhost:3000
- **API Base URL**: http://localhost:4000/api
- **Database File**: `server/db.json`

---

## 📋 API Endpoints Overview

### Claims Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/claims` | Get all claims | No |
| POST | `/api/claims` | Create new claim | No |
| PUT | `/api/claims/:id` | Update claim | No |
| DELETE | `/api/claims/:id` | Delete claim | No |

### User Management  
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | No |
| POST | `/api/users` | Create new user | No |
| PUT | `/api/users/:username` | Update user role | No |
| DELETE | `/api/users/:username` | Delete user | No |

---

## 📊 Claims API Reference

### GET /api/claims
Retrieve all claims from the system.

**Request:**
```http
GET http://localhost:4000/api/claims
Content-Type: application/json
```

**Response:**
```json
[
  {
    "id": 1,
    "clientName": "John Doe",
    "email": "john.doe@email.com",
    "phone": "123-456-7890",
    "claimType": "Auto",
    "claimAmount": 5000,
    "description": "Vehicle accident on Main Street",
    "status": "Pending",
    "dateCreated": "2025-09-17T10:00:00.000Z"
  }
]
```

### POST /api/claims
Create a new claim.

**Request:**
```http
POST http://localhost:4000/api/claims
Content-Type: application/json

{
  "clientName": "Jane Smith",
  "email": "jane.smith@email.com", 
  "phone": "987-654-3210",
  "claimType": "Health",
  "claimAmount": 2500,
  "description": "Medical treatment claim"
}
```

**Response:**
```json
{
  "id": 6,
  "clientName": "Jane Smith",
  "email": "jane.smith@email.com",
  "phone": "987-654-3210", 
  "claimType": "Health",
  "claimAmount": 2500,
  "description": "Medical treatment claim",
  "status": "Pending",
  "dateCreated": "2025-09-17T14:30:00.000Z"
}
```

### PUT /api/claims/:id
Update an existing claim.

**Request:**
```http
PUT http://localhost:4000/api/claims/1
Content-Type: application/json

{
  "clientName": "John Doe",
  "email": "john.doe@email.com",
  "phone": "123-456-7890",
  "claimType": "Auto", 
  "claimAmount": 5500,
  "description": "Updated vehicle accident claim",
  "status": "Approved"
}
```

**Response:**
```json
{
  "id": 1,
  "clientName": "John Doe", 
  "email": "john.doe@email.com",
  "phone": "123-456-7890",
  "claimType": "Auto",
  "claimAmount": 5500,
  "description": "Updated vehicle accident claim", 
  "status": "Approved",
  "dateCreated": "2025-09-17T10:00:00.000Z"
}
```

### DELETE /api/claims/:id
Delete a claim.

**Request:**
```http
DELETE http://localhost:4000/api/claims/1
```

**Response:**
```json
{
  "message": "Claim deleted successfully"
}
```

---

## 👥 Users API Reference

### GET /api/users
Retrieve all users (passwords excluded).

**Request:**
```http
GET http://localhost:4000/api/users
Content-Type: application/json
```

**Response:**
```json
[
  {
    "username": "admin",
    "role": "admin"
  },
  {
    "username": "user1", 
    "role": "user"
  }
]
```

### POST /api/users
Create a new user.

**Request:**
```http
POST http://localhost:4000/api/users
Content-Type: application/json

{
  "username": "newuser",
  "password": "securepassword123",
  "role": "user"
}
```

**Response:**
```json
{
  "username": "newuser",
  "role": "user"
}
```

### PUT /api/users/:username
Update user role.

**Request:**
```http
PUT http://localhost:4000/api/users/user1
Content-Type: application/json

{
  "role": "admin"
}
```

**Response:**
```json
{
  "username": "user1",
  "role": "admin"
}
```

### DELETE /api/users/:username
Delete a user.

**Request:**
```http
DELETE http://localhost:4000/api/users/user1
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

## 🧪 Testing the API

### Using cURL

**Get all claims:**
```bash
curl -X GET http://localhost:4000/api/claims
```

**Create a new claim:**
```bash
curl -X POST http://localhost:4000/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Test User",
    "email": "test@example.com",
    "phone": "555-0123", 
    "claimType": "Auto",
    "claimAmount": 1000,
    "description": "Test claim"
  }'
```

**Create a new user:**
```bash
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "role": "user"
  }'
```

### Using Postman

1. **Set Base URL**: `http://localhost:4000/api`
2. **Set Headers**: `Content-Type: application/json`
3. **Import Collection**: Use the endpoints above to create requests
4. **Test Scenarios**: Create, read, update, delete operations

### Using Browser

**View Claims (JSON):**
```
http://localhost:4000/api/claims
```

**View Users (JSON):**
```
http://localhost:4000/api/users
```

---

## ⚠️ Error Codes

### HTTP Status Codes Used

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

### Error Response Format

```json
{
  "error": "Error message describing what went wrong",
  "details": "Additional details about the error (optional)"
}
```

### Common Error Scenarios

**404 - Claim Not Found:**
```json
{
  "error": "Claim not found"
}
```

**404 - User Not Found:**
```json
{
  "error": "User not found"
}
```

**400 - Validation Error:**
```json
{
  "error": "Username already exists"
}
```

**500 - Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## 🔧 Development Tools

### Postman Collection
You can create a Postman collection with these requests:

```json
{
  "info": {
    "name": "Claim Processing API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Claims",
      "item": [
        {
          "name": "Get All Claims",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/claims"
          }
        },
        {
          "name": "Create Claim", 
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/claims",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"clientName\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"phone\": \"555-0123\",\n  \"claimType\": \"Auto\",\n  \"claimAmount\": 1000,\n  \"description\": \"Test claim\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET", 
            "url": "{{baseUrl}}/users"
          }
        },
        {
          "name": "Create User",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/users",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"testuser\",\n  \"password\": \"password123\",\n  \"role\": \"user\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:4000/api"
    }
  ]
}
```

### Environment Variables
Create a `.env` file for configuration:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration  
DB_FILE=db.json

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

---

## 📝 Data Validation Rules

### Claims Validation
- **clientName**: Required, string, 2-100 characters
- **email**: Required, valid email format
- **phone**: Required, phone number format (XXX-XXX-XXXX)
- **claimType**: Required, string
- **claimAmount**: Required, positive number
- **description**: Required, string, 10-500 characters
- **status**: Optional, defaults to "Pending"

### Users Validation
- **username**: Required, unique, 3-20 characters, alphanumeric
- **password**: Required, 6+ characters (not returned in responses)
- **role**: Required, must be "user" or "admin"

---

## 🚀 Quick Start Testing

### 1. Verify Server is Running
```bash
curl http://localhost:4000/api/claims
```

### 2. Test Complete Flow
```bash
# Create a claim
curl -X POST http://localhost:4000/api/claims \
  -H "Content-Type: application/json" \
  -d '{"clientName":"Test","email":"test@test.com","phone":"123-456-7890","claimType":"Auto","claimAmount":1000,"description":"Test claim"}'

# Get all claims to see the new one
curl http://localhost:4000/api/claims

# Create a user  
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass123","role":"user"}'

# Get all users
curl http://localhost:4000/api/users
```

### 3. Test UI Integration
1. Open http://localhost:3000
2. Navigate through all pages
3. Create a new claim
4. Edit existing claims
5. Manage users
6. Verify data persistence

---

*For more detailed information, see the main [WIKI.md](WIKI.md) file.*