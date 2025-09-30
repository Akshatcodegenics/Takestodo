# Scalable Web App (React + Tailwind + Express + MongoDB)

A full-stack example with JWT authentication (access + refresh tokens), protected routes, user profile, and CRUD for Tasks with search/filter. Built with React (Vite + TailwindCSS) on the frontend and Node.js/Express/Mongoose on the backend.

## Project Structure

- backend/ — Express API, JWT auth, MongoDB via Mongoose
- frontend/ — React app (Vite), TailwindCSS, React Router, axios

## Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB (local or Atlas). For local dev, default is mongodb://localhost:27017/scalable_webapp

## Environment Variables

Create environment files from the provided examples:

- backend/.env (copy from backend/.env.example)
  - MONGO_URI=mongodb://localhost:27017/scalable_webapp
  - PORT=4000
  - CORS_ORIGIN=http://localhost:5173
  - JWT_ACCESS_SECRET=replace-with-strong-access-secret
  - JWT_REFRESH_SECRET=replace-with-strong-refresh-secret
  - NODE_ENV=development
  - REFRESH_TOKEN_COOKIE_NAME=refresh_token
  - REFRESH_TOKEN_EXPIRES_IN_DAYS=7

- frontend/.env (copy from frontend/.env.example)
  - VITE_API_URL=http://localhost:4000/api

## Install & Run (Windows PowerShell)

1) Install backend deps

```
# PowerShell
npm install --prefix "./backend"
```

2) Install frontend deps

```
npm install --prefix "./frontend"
```

3) Start backend (dev)

```
npm run dev --prefix "./backend"
```

4) Start frontend (dev)

```
npm run dev --prefix "./frontend"
```

- Backend: http://localhost:4000
- Frontend: http://localhost:5173

If using cookies across origins in production, set CORS_ORIGIN to the deployed frontend origin and ensure HTTPS (secure cookies).

## API Overview

Base URL: http://localhost:4000/api

- Auth
  - POST /auth/signup — { name, email, password }
  - POST /auth/login — { email, password }
  - POST /auth/logout — clears refresh cookie
  - POST /auth/refresh — issues new access token from refresh cookie

- Users
  - GET /users/me — returns current user
  - PUT /users/me — { name }

- Tasks
  - GET /tasks?q=&status=&completed=&page=&limit= — list (search + filter + paginate)
  - GET /tasks/:id — fetch one
  - POST /tasks — { title, description?, status?, completed? }
  - PUT /tasks/:id — update fields
  - DELETE /tasks/:id — remove

All non-auth routes require Bearer access token (Authorization header). The refresh token is stored in an HttpOnly cookie and rotated on refresh.

## Postman Collection

Import backend/src/docs/postman_collection.json into Postman. It includes environment variable {{baseUrl}} (default http://localhost:4000/api).

## Security Notes

- Passwords are hashed with bcrypt.
- Access tokens expire in ~15 minutes; refresh tokens in 7 days (configurable).
- Refresh tokens are sent as HttpOnly cookies with SameSite=Lax (dev) or None (prod + HTTPS).
- JWT middleware protects routes and validates tokens.
- Centralized error handling with consistent JSON shape.

## Scalability & Modularity

- Modular folders: models, controllers, routes, middleware, utils.
- Token version (tokenVersion) on User model supports future refresh token invalidation (e.g., logout-all by incrementing version).
- Validation via express-validator and a shared validate middleware.
- Frontend uses Axios instance with interceptors and a simple AuthContext for app-wide state.

## Testing the Flow

1) Signup a new user, then login.
2) Visit Dashboard to create tasks, search/filter them, and toggle status/completion.
3) Visit Profile to update your name.
4) Use Postman to exercise auth and CRUD endpoints.

## Production Considerations

- Serve frontend from a CDN or static host; deploy backend to a container platform.
- Set NODE_ENV=production, use HTTPS, and set secure cookies (CORS and SameSite=None).
- Configure proper indexes on MongoDB for high-volume filtering (title/description text index, user+status+completed compound index if needed).
- Add request rate limiting and helmet for headers.
- Add logging solution (e.g., pino + centralized logging).
