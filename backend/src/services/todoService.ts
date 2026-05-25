import db from "../db.js";
import { Category, CreateTodo, Todo, TodoRow } from "../type.js";

const ACTIVE_LIMIT = 5;

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

export function createTodo(body: CreateTodo): Todo {
    const text = body.text.trim();
    const category = body.category.trim();

    if (!text || !category) {
        const error = new Error("Text and category are required");
        (error as Error & { status: number }).status = 400;
        throw error
    }

    const categoryExists = db.prepare("SELECT 1 FROM categories WHERE name = ?").get(category);

    if (!categoryExists) {
        const err = new Error(`Unknown category: ${category}`);
        (err as Error & { status: number }).status = 400;
        throw err;
    }

    const activeCount = db
        .prepare("SELECT COUNT(*) AS count FROM todos WHERE category = ? AND completed = 0")
        .get(category) as { count: number };

    if (activeCount.count >= ACTIVE_LIMIT) {
        const err = new Error(`Category ${category} already has 5 tasks`);
        (err as Error & { status: number }).status = 400;
        throw err;
    }


    const result = db.prepare("INSERT INTO todos (text, category) VALUES (?, ?)").run(text, category);
    const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(result.lastInsertRowid) as TodoRow;

    return rowToTodo(row);
}

export function updateTodo(id: number, completed: boolean): Todo {
    const existing = db.prepare("SELECT id FROM todos WHERE id = ?").get(id);

    if (!existing) {
        const err = new Error("Todo not found");
        (err as Error & { status: number }).status = 404;
        throw err;
    }

    db.prepare("UPDATE todos SET completed = ? WHERE id = ?").run(completed ? 1 : 0, id);

    const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow;

    return rowToTodo(row);
}

export function deleteTodo(id: number) {
    const result = db.prepare("DELETE FROM todos WHERE id = ?").run(id);

    if (result.changes === 0) {
        const err = new Error("Todo not found");
        (err as Error & { status: number }).status = 404;
        throw err;
    }
}
