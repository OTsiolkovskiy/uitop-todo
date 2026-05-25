# UITOP Todo

Backend API for a task manager with categories (Express + TypeScript + SQLite).

**Repo:** https://github.com/OTsiolkovskiy/uitop-todo

## Run

```bash
cd backend
npm install
npm run dev
```

Server: http://localhost:4000

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/categories` | List categories |
| GET | `/todos` | List todos (`?category=Work` optional) |
| POST | `/todos` | Create todo |
| PATCH | `/todos/:id` | Update `completed` |
| DELETE | `/todos/:id` | Delete todo (204) |

### POST body

```json
{ "text": "Buy milk", "category": "Work" }
```

Categories: `Work`, `Personal`, `Shopping`, `Health`, `Other`.

### PATCH body

```json
{ "completed": true }
```

## 5 tasks per category

Max **5 active** (not completed) tasks per category. Completed tasks do not count.

Returns `400` with `{ "error": "Category Work already has 5 tasks" }` on POST or when reactivating via PATCH.

## Stack

- Express, TypeScript, better-sqlite3, Zod
