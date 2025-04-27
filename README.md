


# 🛡️ API Gateway Service (Auth for AirplanSerive)

## 🛫 Description
The API Gateway Service acts as the entry point for client requests, handling authentication and routing traffic to appropriate microservices.  
It is built on Node.js with a clean modular architecture to ensure scalability, security, and ease of maintenance.  
Designed to serve as a strong foundation for any microservices-based application.

---

## ✅ Features
This project offers the following features:

- **RESTful API Architecture**: Organizes resources and routes cleanly using standard HTTP methods.
- **Modular Codebase**: Well-separated folders for easy scalability and maintainability.
- **Environment-based Configuration**: Manage different setups for development, test, and production environments using `.env` and `config.json`.
- **Middleware Support**: Request interceptors like authenticators and validators for secure and validated APIs.
- **Database Integration**: Connects seamlessly to SQL databases (MySQL) via Sequelize ORM.
- **Structured Error Handling**: Consistent error responses and logging setup for easier debugging.
- **Extensible Design**: Easily add new routes, services, or features without restructuring the code.

---

## 🔧 Prerequisites
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

## 📁 Folder Structure
Project structure under the `src/` directory:

```
src/
│
├── config/         # Configuration setup (dotenv, Sequelize DB config, logging, etc.)
├── routes/         # Registers routes and links them with controllers and middleware
├── controllers/    # Handle incoming requests, call services, and return API responses
├── middlewares/    # Validate, authenticate, or manipulate incoming requests
├── repositories/   # Direct database interaction (raw SQL/ORM queries)
├── services/       # Core business logic (e.g., user authentication, token generation)
├── utils/          # Utility functions (error classes, helper methods)
└── index.js        # Entry point of the application
```

---

## 🚀 Project Setup
Follow these steps to set up and run the project locally:

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/ZBS-1910/API-Gateway.git
cd API-Gateway
npm install
```

### 2. Create a `.env` File
Create a `.env` file in the root directory:

```bash
PORT=5000
```
*(You can choose any available port.)*

---

### 3. Set Up Database Configuration
Inside the `src/config` folder, create a `config.json` file and add:

```json
{
  "development": {
    "username": "root",
    "password": null, //MySQL_password
    "database": "database_development", //MySQL_DB-name
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

✅ **Update** `username`, `password`, and `database` as per your local or cloud database setup.

---

### 4. Initialize Sequelize
Inside the `src/` folder:

```bash
cd src
npx sequelize init
```
This will create:

- `migrations/`
- `models/`
- `seeders/`
- Update your `config/config.json`

---

### 5. Run Database Migrations
To apply the DB schema:

```bash
cd src
npx sequelize db:migrate
```

---

### 6. Start the Server
Run the application:

```bash
npm run dev
```

If everything is set up correctly, you’ll see:

```
Server started at PORT 3000
```
Access the API at `http://localhost:5000`.

---

## 👤 Author
- **Name**: Zameer Basha S  
- **GitHub**: [ZBS-1910](https://github.com/ZBS-1910)  
- **Email**: zameer1910basha@gmail.com

---
