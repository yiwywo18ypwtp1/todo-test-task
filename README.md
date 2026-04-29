# Task Manager App

Simple fullstack task manager with JWT authentication.

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL

## Features

- User authentication (JWT)
- Create / Read / Update / Delete tasks
- Filter tasks by status
- Sort tasks by status
- Protected routes
- User info (`/me` endpoint)

## Setup

### 1. Clone repo

```bash
git clone <your-repo-url>
cd task-app-test
````

### 2. Backend

```bash
cd backend
npm install
```

Create `.env` from example:

```bash
cp .env.example .env
```

Fill variables:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
PORT=5001
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create `.env` if needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

Start frontend:

```bash
npm run dev
```

## API Overview

### Auth

* `POST /auth/signup`
* `POST /auth/login`
* `GET /auth/me`

### Tasks

* `GET /tasks`
* `GET /tasks/:id`
* `POST /tasks`
* `PATCH /tasks/:id`
* `DELETE /tasks/:id`

## Notes

* All task endpoints require JWT token
* Token is stored in localStorage
* Filtering is supported via query param:

```
GET /tasks?status=TODO
```

## Env Example

Check `.env.example` for required variables.

```
