import db from "../db.js";
import { Category } from "../type.js";

export function getCategories(): Category[] {
    return db.prepare("SELECT * FROM categories").all() as Category[];
}
