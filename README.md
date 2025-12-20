# ICHgram Backend

This is the backend of **ICHgram**, a full-featured social media application inspired by Instagram. It provides RESTful API and real-time chat functionality, built using **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

---

## 🚀 Live Deployment

- **API Base URL**: [https://ichgram-backend-zq6v.onrender.com](https://ichgram-backend-zq6v.onrender.com)

---

## ⚙️ Tech Stack

- **Node.js** + **Express** — server framework
- **TypeScript** — static typing
- **MongoDB** + **Mongoose** — database and ODM
- **Zod** — input validation
- **Cloudinary** — image hosting
- **Multer** — file upload middleware
- **JWT** — access & refresh token authentication
- **Socket.IO** — real-time messaging
- **dotenv** — environment variable management
- **bcrypt** — password hashing

---

## 📦 Features

- User registration, login, logout with JWT (access + refresh tokens)
- Secure password storage (bcrypt)
- Profile editing, following/unfollowing users
- Create, update, delete posts with image uploads to Cloudinary
- Like/unlike posts and comments
- Add/remove comments under posts
- Real-time 1:1 chat via Socket.IO
- Notification system (like, comment, follow)
- RESTful API with protected routes
- Centralized error handling and request validation

---

## 📁 Project Structure

```
src/
├── controllers/         # Route handlers
├── services/            # Business logic
├── routers/             # Express routers
├── db/models/           # Mongoose schemas
├── middlewares/         # Auth, error handlers, validation
├── utils/               # JWT, Cloudinary, helpers
├── schemas/             # Zod validation schemas
├── socket.ts            # Socket.IO server setup
├── index.ts             # Entry point
├── server.ts            # App + HTTP + WebSocket bootstrap
```

---

## 🔐 Authentication

- JWT access token (3d lifespan) + refresh token (7d)
- Tokens are stored in MongoDB for session invalidation
- Middleware validates tokens and protects routes

---

## 🔄 API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `POST /api/posts`
- `DELETE /api/posts/:id`
- `GET /api/posts/explore`
- `GET /api/posts/feed`
- `POST /api/comments/:postId`
- `POST /api/likes/:postId`
- `POST /api/follows/:userId`
- `GET /api/messages/:userId`

...and more.

---

## 💬 Socket.IO Events

- `message:send` — send private message
- `message:new` — receive message
- Auth handshake uses JWT in `socket.handshake.auth.token`

---

## 🧪 Setup & Run

### 1. Clone repository

```bash
git clone https://github.com/thomas-marth/ichgram-backend.git && cd ichgram-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create `.env` file:

```
PORT=3000
MONGODB_URI=your-mongo-uri
JWT_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

### 4. Start in dev mode

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build && npm start
```

---

## 🧹 Linting & Formatting

```bash
npm run lint      # ESLint
npm run lint:fix  # Auto fix
npm run format    # Prettier
```

---

## 📜 License

This project is for educational purposes only.
