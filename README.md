# Chat App Backend

## Overview
This is the backend for a **group chat application** built with **TypeScript, Express, PostgreSQL, and TypeORM**. It supports **authentication, group-based messaging, and role-based access control**.

## Features
- **User Authentication** (Signup, Login, JWT-based auth)
- **Group Chat Functionality**
  - Create Public & Private Groups
  - Join Public Groups
  - Invite Users to Private Groups
  - Send Messages in Groups
- **Role-Based Access Control**
  - Admins can manage groups
  - Users can join and chat
- **Secure API Endpoints** with JWT Authentication
- **Database Integration** with PostgreSQL & TypeORM

---

## Tech Stack
- **Backend:** TypeScript, Express.js, TypeORM
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Validation & Security:** bcrypt, express-validator

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional for running DB in a container)

### Steps to Run Locally

1. **Clone the repository**
   ```sh
   git clone https://github.com/devprince116/chat-app-backend.git
   cd chat-app-backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=4000
   DATABASE_NAME=chat_app
   HOST=localhost
   DB_PORT=5432
   DB_PASS=your_DB_pass
   JWT_SECRET=your_secret_key
   ```


5. **Start the server**
   ```sh
   npm start
   ```

6. **API is now running on** `http://localhost:4000`

---

## API Documentation
This project follows **OpenAPI Specification** using **Swagger UI**.

To access the API documentation:
- **Run the server** and open: `http://localhost:4000/api-docs`

---

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - User login (returns JWT token)

### Groups
- `POST /group/` - Create a new group (Authenticated)
- `POST /group/:id` - Join a public group
- `GET /group/all` - Get all available groups

### Chats
- `POST /chat/` - Send a message in a group
- `GET /chat/:groupId` - Get messages from a group

### Group Invitations
- `POST /users/:token` - Accept an invitation to a private group

---


### Build & Start in Production
```sh
npm run build
npm start
```

---

## Contribution Guidelines
1. **Fork the repository**
2. **Create a new branch** (`feature/your-feature`)
3. **Commit changes** (`git commit -m "Added new feature"`)
4. **Push branch** (`git push origin feature/your-feature`)
5. **Create a Pull Request**

---

## License
This project is licensed under the **MIT License**.

---

## Contact
For any queries, reach out to **rajprince.75way@gmail.com** or create an issue on GitHub.

Happy Coding! 🚀

