
# 🩺 Appointment Booking System API

This is a RESTful API built with Node.js and Express.js that allows users to register, log in, and book appointments. It includes role-based access and JWT authentication. Postman is used for automated end-to-end (E2E) testing.

---

## 🚀 Features

- User Registration and Login (JWT-based)
- Appointment booking and availability management
- Middleware for authentication and authorization
- MongoDB for database storage
- Postman tests for full user flow validation

---

## 📁 Project Structure

```
APPOINTMENT_SYSTEM/
│
├── middleware/             # Auth middleware
│   ├── authmiddleware.js
│   └── protect.js
│
├── models/                 # Mongoose models
│   ├── appointment.js
│   ├── availability.js
│   └── user.js
│
├── routes/                 # Express route handlers
│   ├── appointment.js
│   ├── auth.js
│   └── availability.js
│
├── index.js                # Entry point
├── package.json
├── README.md
├── .env                    # Environment variables (not included)
├── appointment-api.postman_collection.json
├── appointment-env.postman_environment.json (optional)
```

---

## ⚙️ Setup Instructions

1. **Clone the repo or unzip the folder**
2. **Install dependencies**  
   ```
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root directory:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server**  
   ```
   node index.js
   ```
   Your API should be running on `http://localhost:5000`

---

## 🔐 Authentication

- Register and login endpoints return a JWT token.
- Use the token in the `Authorization` header as:
  ```
  Authorization: Bearer <token>
  ```

---

## 📬 API Endpoints

| Method | Endpoint               | Description               | Auth Required |
|--------|------------------------|---------------------------|----------------|
| POST   | `/api/auth/register`   | Register new user         | ❌             |
| POST   | `/api/auth/login`      | Login user                | ❌             |
| GET    | `/api/appointments`    | View all appointments     | ✅             |
| POST   | `/api/appointments`    | Book an appointment       | ✅             |
| GET    | `/api/availability`    | View availability         | ✅             |
| POST   | `/api/availability`    | Set availability          | ✅             |

---

## 🧪 Running Postman Tests

1. Open Postman.
2. Import the following files:
   - `appointment-api.postman_collection.json`
   - `appointment-env.postman_environment.json` *(optional)*
3. Go to **Collection Runner**.
4. Select environment (if used) and click **Run**.
5. You’ll see all test cases pass/fail.

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Postman for API testing

---

## 📄 License

This project is for educational/demo purposes only.
