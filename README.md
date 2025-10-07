# Todo App (Vite + React, Node, MongoDB)

This small project contains a React (Vite) frontend and an Express + MongoDB backend to manage tasks with statuses: backlog, not-started, completed.

Folders:

- `server` - Express API (runs on port 4000 by default)
- `client` - Vite React app (runs on port 3000 by default)

Quick start (Windows PowerShell):

1. Start MongoDB (local or Atlas).
2. Server:

```powershell
cd server; npm install; cp .env.example .env; # edit .env if needed
npm run dev
```

3. Client:

```powershell
cd client; npm install; npm run dev
```

Client expects the API at `http://localhost:4000/api`. To change, set `VITE_API_BASE` in `client/.env`.

Task statuses used by the app:

- `backlog` (default)
- `not-started`
- `completed`
