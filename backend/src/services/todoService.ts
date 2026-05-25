import db from "../db.js";
import { Category, Todo, TodoRow } from "../type.js";

export function getCategories(): Category[] {
    return db.prepare("SELECT * FROM categories").all() as Category[];
}

function rowToTodo(row: TodoRow): Todo {
    return {
      id: row.id,
      text: row.text,
      category: row.category,
      completed: row.completed === 1,
      created_at: row.created_at,
    };
}

export function getTodos(category: string): Todo[] {
    const normalized = category?.trim();

    if (!normalized || normalized === "All") {
        const rows = db.prepare("SELECT * FROM todos ORDER BY id DESC").all() as TodoRow[];
        return rows.map(rowToTodo);
    }

    const rows = db.prepare("SELECT * FROM todos WHERE category = ? ORDER BY id DESC").all(normalized) as TodoRow[];

    return rows.map(rowToTodo);
}
