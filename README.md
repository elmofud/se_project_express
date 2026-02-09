# WTWR (What to Wear?): Back End

## Project Description

WTWR is a backend application that provides API endpoints for managing users and clothing items. The application allows users to create, view, and manage a collection of clothing items, with the ability to like/unlike items. This backend is designed to work with a frontend application that helps users decide what to wear based on weather conditions.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## Technologies and Techniques Used

### Core Technologies

- **Node.js** - JavaScript runtime environment for server-side development
- **Express.js** - Web application framework for Node.js, used to build RESTful API endpoints
- **MongoDB** - NoSQL database for storing user and clothing item data
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB, providing schema validation and data modeling

### Development Tools

- **Nodemon** - Development utility that automatically restarts the server when file changes are detected
- **ESLint** - Code linting tool to maintain code quality and consistency
- **Postman** - API testing and development platform

## Features

### User Management

- Create new users with name and avatar
- Retrieve all users
- Retrieve individual user by ID

### Clothing Item Management

- Create new clothing items with name, weather type, and image URL
- Retrieve all clothing items
- Delete clothing items
- Like/unlike clothing items

### Error Handling

- Comprehensive error handling with appropriate HTTP status codes:
  - **400** - Bad Request (invalid data or invalid ID format)
  - **404** - Not Found (resource doesn't exist)
  - **500** - Internal Server Error (server-side errors)
- Centralized error constants for consistency
- Detailed error messages for better debugging

### Data Validation

- Schema validation using Mongoose
- URL validation for avatar and image URLs
- String length validation for names
- Enum validation for weather types (hot, warm, cold)

## Key Techniques Implemented

### Middleware

- **JSON Parser** - `express.json()` middleware to parse incoming JSON request bodies
- **Temporary Authorization** - Hardcoded user authentication middleware (to be replaced with JWT in future sprints)
- **404 Handler** - Catches requests to non-existent routes

### Mongoose Methods

- **`.find()`** - Retrieve all documents from a collection
- **`.findById()`** - Retrieve a single document by ID
- **`.create()`** - Create new documents
- **`.findByIdAndDelete()`** - Find and delete a document by ID
- **`.findByIdAndUpdate()`** - Find and update a document by ID
- **`.orFail()`** - Helper method to throw an error when a document is not found

### MongoDB Operators

- **`$addToSet`** - Adds a value to an array only if it doesn't already exist (used for liking items)
- **`$pull`** - Removes a value from an array (used for unliking items)

### Code Organization

- **MVC Pattern** - Models, Controllers, and Routes are separated for better maintainability
- **Centralized Error Constants** - Error codes and messages stored in a utilities file
- **Modular Routing** - Separate route files for users and clothing items

## Project Structure

```
wtwr-backend/
├── models/
│   ├── user.js              # User schema and model
│   └── clothingItem.js      # Clothing item schema and model
├── controllers/
│   ├── users.js             # User-related controller logic
│   └── clothingItems.js     # Clothing item-related controller logic
├── routes/
│   ├── users.js             # User route definitions
│   └── clothingItems.js     # Clothing item route definitions
├── utils/
│   └── errors.js            # Centralized error codes and messages
├── app.js                   # Main application entry point
└── package.json             # Project dependencies and scripts
```

## API Endpoints

### Users

- **GET** `/users` - Get all users
- **GET** `/users/:userId` - Get user by ID
- **POST** `/users` - Create a new user

### Clothing Items

- **GET** `/items` - Get all clothing items
- **POST** `/items` - Create a new clothing item
- **DELETE** `/items/:itemId` - Delete a clothing item
- **PUT** `/items/:itemId/likes` - Like a clothing item
- **DELETE** `/items/:itemId/likes` - Unlike a clothing item

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally)

### Installation Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd wtwr-backend
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB:

```bash
mongod
```

4. Create a test user using Postman:

- Send a POST request to `http://localhost:3001/users`
- Request body:

```json
{
  "name": "Your Name",
  "avatar": "https://example.com/avatar.jpg"
}
```

5. Copy the user's `_id` from the response and update `app.js`:

```javascript
app.use((req, res, next) => {
  req.user = {
    _id: "PASTE_YOUR_USER_ID_HERE",
  };
  next();
});
```

6. Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Dependencies

### Production Dependencies

- **express** - ^4.18.2 - Web framework
- **mongoose** - ^7.0.0 - MongoDB ODM

### Development Dependencies

- **nodemon** - ^2.0.20 - Auto-restart development server
- **eslint** - ^8.0.0 - Code linting

## Future Enhancements

- Implement JWT-based authentication to replace temporary authorization middleware
- Add user login and signup endpoints
- Implement proper authorization checks (users can only delete their own items)
- Add pagination for GET requests
- Implement image upload functionality
- Add filtering and sorting options for clothing items
- Create comprehensive API documentation with Swagger

## Learning Outcomes

This project demonstrates proficiency in:

- Building RESTful APIs with Express.js
- Database design and modeling with MongoDB and Mongoose
- Implementing CRUD operations
- Error handling and validation
- Middleware implementation
- Code organization and best practices
- Version control with Git

## Author

Tracey Garber 2026
Developed as part of the TripleTen Software Engineering Bootcamp

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
