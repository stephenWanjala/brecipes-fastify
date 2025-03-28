# Recipe API

A RESTful API built with Fastify, TypeScript, and Prisma for managing recipes. The API includes user authentication, API key management, and role-based access control.

## Features

- User authentication with JWT
- API key support for authentication
- Role-based access control (USER and ADMIN roles)
- Rate limiting on recipe endpoints
- Recipe management with CRUD operations
- Batch recipe seeding support
- PostgreSQL database with Prisma ORM
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/your_database"
JWT_SECRET="your-secret-key-here"
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## API Documentation

### Authentication

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"  // Optional, defaults to "USER"
}
```

Response:
```json
{
  "token": "jwt-token",
  "apiKey": "api-key",
  "role": "USER"
}
```

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt-token",
  "apiKey": "api-key",
  "role": "USER"
}
```

### API Key Management

#### Get Current API Key
```http
GET /api/apikey/current
Authorization: Bearer <jwt-token>
```

#### Regenerate API Key
```http
POST /api/apikey/regenerate
Authorization: Bearer <jwt-token>
```

#### List All API Keys (Admin Only)
```http
GET /api/apikey/all
Authorization: Bearer <jwt-token>
```

### Recipes

All recipe endpoints require either:
- JWT token in Authorization header: `Authorization: Bearer <jwt-token>`
- API key in X-API-Key header: `X-API-Key: <api-key>`

#### Get All Recipes (Paginated)
```http
GET /api/recipes?page=1&limit=10&cuisine=italian
```

#### Search Recipes
```http
GET /api/recipes/search?q=pasta&page=1&limit=10
```

#### Get Available Cuisines
```http
GET /api/recipes/cuisines
```

#### Get Single Recipe
```http
GET /api/recipes/:id
```

#### Create Recipe (Admin Only)
```http
POST /api/recipes
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Recipe Title",
  "description": "Recipe Description",
  "cuisine": "italian",
  "image": "image-url",
  "sourceUrl": "source-url",
  "chefName": "Chef Name",
  "preparationTime": "30 mins",
  "cookingTime": "1 hour",
  "serves": "4",
  "ingredientsDesc": ["ingredient 1", "ingredient 2"],
  "ingredients": ["ingredient1", "ingredient2"],
  "method": ["step 1", "step 2"]
}
```

#### Update Recipe (Admin Only)
```http
PUT /api/recipes/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated Title",
  // ... other fields
}
```

#### Delete Recipe (Admin Only)
```http
DELETE /api/recipes/:id
Authorization: Bearer <jwt-token>
```

#### Seed Recipes (Admin Only)
```http
POST /api/recipes/seed
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "recipes": [
    {
      "title": "Recipe 1",
      // ... other recipe fields
    }
  ]
}
```

## Rate Limiting

The API implements rate limiting on recipe endpoints:
- 100 requests per minute per IP address
- Applies to all recipe endpoints

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Development

Build the project:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Database Schema

### User
- id: UUID (Primary Key)
- email: String (Unique)
- password: String (Hashed)
- role: Enum (USER, ADMIN)
- createdAt: DateTime
- updatedAt: DateTime

### ApiKey
- id: UUID (Primary Key)
- key: String (Unique)
- userId: UUID (Foreign Key)
- createdAt: DateTime
- updatedAt: DateTime

### Recipe
- id: UUID (Primary Key)
- title: String
- description: String
- cuisine: String
- image: String (Optional)
- sourceUrl: String (Optional)
- chefName: String
- preparationTime: String
- cookingTime: String
- serves: String
- ingredientsDesc: String[]
- ingredients: String[]
- method: String[]
- userId: UUID (Foreign Key)
- createdAt: DateTime
- updatedAt: DateTime