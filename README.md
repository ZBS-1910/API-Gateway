# API Gateway Service (Auth for AirplanSerive)
This project is a simple API Gateway Service that handles authentication and routing for client requests.  

## Description
The API Gateway Service acts as the entry point for client requests, handling authentication and routing traffic to appropriate microservices.  
It is built on Node.js with a clean modular architecture to ensure scalability, security, and ease of maintenance.  
Designed to serve as a strong foundation for any microservices-based application.

---

## Features
This project offers the following features:

- **RESTful API Architecture**: Organizes resources and routes cleanly using standard HTTP methods.
- **Modular Codebase**: Well-separated folders for easy scalability and maintainability.
- **Environment-based Configuration**: Manage different setups for development, test, and production environments using `.env` and `config.json`.
- **Middleware Support**: Request interceptors like authenticators and validators for secure and validated APIs.
- **Database Integration**: Connects seamlessly to SQL databases (MySQL) via Sequelize ORM.
- **Structured Error Handling**: Consistent error responses and logging setup for easier debugging.
- **Extensible Design**: Easily add new routes, services, or features without restructuring the code.

---

## Prerequisites
Ensure the following are installed before proceeding:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MySQL (or any SQL dialect supported by Sequelize)

### Additional Tools (Recommended)
- Git: For version control.
- Postman/cURL: For API testing.
- Sequelize CLI: For managing database migrations and seeders.
- VS Code: For efficient development.
- Docker (optional): For containerized development and deployment.

--- 

## Folder Structure
```
Project structure:

├── config/         # Configuration setup (dotenv, Sequelize DB config, logging, etc.)
├── routes/         # Registers routes and links them with controllers and middleware
├── controllers/    # Handle incoming requests, call services, and return API responses
├── middlewares/    # Validate, authenticate, or manipulate incoming requests
├── repositories/   # Direct database interaction (raw SQL/ORM queries)
├── services/       # Core business logic (e.g., user authentication, token generation)
├── utils/          # Utility functions (error classes, helper methods)
└── index.js        # Entry point of the application
```


## API Endpoints
```
The API Gateway Service provides the following API endpoints:
```
### User Management
```
- **POST /api/user/signup**: User registration
- **POST /api/user/signin**: User login
- **POST /api/user/role**: Add role to user (admin only)
```
### System Information
```
- **GET /api/info**: Get system information
```
### Service APIs
```
- **Flight Service**: /flights/*
- **Booking Service**: /bookings/*
- **Notification Service**: /notifications/*
```
### Security Features
```
- **Authentication middleware**: for protected routes
- **Admin role verification**: for sensitive operations
- **Rate limiting**: 30 requests per 2 minutes per IP
- **CORS enabled**
- **Error handling middleware**
```
