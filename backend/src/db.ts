import Database from "better-sqlite3";

const db = new Database("data/todos.db");

// Create table categories
db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
`);

// Create table todos
db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      category TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

// Create index
db.exec(`
    CREATE INDEX IF NOT EXISTS idx_todos_category_completed
    ON todos(category, completed)
`);

// Seed categories
const row = db
  .prepare("SELECT COUNT(*) AS count FROM categories")
  .get() as { count: number };

if (row.count === 0) {
  const insert = db.prepare("INSERT INTO categories (name) VALUES (?)");
  const categories = ["Work", "Personal", "Shopping", "Health", "Other"];
  for (const name of categories) {
    insert.run(name);
  }
}

export default db;
