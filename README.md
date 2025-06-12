[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19736997&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

A RESTful API built with Express.js that implements CRUD operations for a product management system.

## 🚀 Features

- RESTful API endpoints for product management
- Authentication using API key
- Request validation
- Error handling
- Advanced features:
  - Product filtering by category
  - Pagination
  - Search functionality
  - Product statistics

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## 🛠️ Setup

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd week-2-express-js-assignment-Gitaumarggy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   API_KEY=your-secret-api-key-123
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on http://localhost:3000

## 🔑 API Documentation

### Authentication
All API endpoints require an API key to be included in the request headers:
```
X-API-Key: your-api-key
```

### Endpoints

#### 1. Get All Products
```http
GET /api/products
```
Query Parameters:
- `category` (optional): Filter by category
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search products by name

Example Response:
```json
{
  "total": 3,
  "page": 1,
  "limit": 10,
  "products": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

#### 2. Get Product by ID
```http
GET /api/products/:id
```
Example Response:
```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

#### 3. Create Product
```http
POST /api/products
```
Request Body:
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "electronics",
  "inStock": true
}
```

#### 4. Update Product
```http
PUT /api/products/:id
```
Request Body: Same as Create Product

#### 5. Delete Product
```http
DELETE /api/products/:id
```

#### 6. Get Product Statistics
```http
GET /api/products/stats
```
Example Response:
```json
{
  "totalProducts": 3,
  "categories": {
    "electronics": 2,
    "kitchen": 1
  },
  "inStock": 2,
  "outOfStock": 1,
  "averagePrice": 683.33
}
```

## ⚠️ Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "error": "Error message description"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request (Validation Error)
- 401: Unauthorized (Invalid API Key)
- 404: Not Found
- 500: Internal Server Error

## 🧪 Testing

You can test the API using tools like Postman or curl. Here's an example using curl:

```bash
# Get all products
curl -H "X-API-Key: your-api-key" http://localhost:3000/api/products

# Create a new product
curl -X POST -H "X-API-Key: your-api-key" -H "Content-Type: application/json" \
  -d '{"name":"New Product","description":"Description","price":99.99,"category":"electronics","inStock":true}' \
  http://localhost:3000/api/products
```

## 📝 Notes

- All prices should be positive numbers
- The `inStock` field must be a boolean
- All fields (name, description, price, category, inStock) are required when creating or updating a product
- The API key must be included in the `X-API-Key` header for all requests

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 