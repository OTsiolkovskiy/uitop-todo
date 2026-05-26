# UITOP Todo

Full-stack task manager with categories.

**Repo:** https://github.com/OTsiolkovskiy/uitop-todo  
**Live demo:** https://uitop-todo-fawn.vercel.app  
**API:** https://uitop-todo-s0bl.onrender.com

## Stack

- **Frontend:** Next.js, React, TypeScript, MUI, React Hook Form, Axios
- **Backend:** Express, TypeScript, SQLite (`better-sqlite3`), Zod

## Run

**Backend** (port 4000):

```bash
cd backend
npm install
npm run dev
```

**Frontend** (port 3000):

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
npm run dev
```

Open http://localhost:3000

> **Windows:** `better-sqlite3` may require [VS Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (C++ workload).

## Features

- Create, complete, and delete todos with category
- Filter by category or show all
- Max **5 active** tasks per category
- Snackbar with **Undo** (5s) on complete and delete
- Loading, error, and empty states

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/categories` | Categories list |
| GET | `/todos` | Todos (`?category=Work`) |
| POST | `/todos` | Create `{ "text", "category" }` |
| PATCH | `/todos/:id` | Update `{ "completed": true }` |
| DELETE | `/todos/:id` | Delete |

Limit error: `400` — `{ "error": "Category Work already has 5 tasks" }`
