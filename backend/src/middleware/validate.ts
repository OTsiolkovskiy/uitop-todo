import type { RequestHandler } from "express";
import z from "zod";
import db from "../db.js";

export const createTodoSchema = z
    .object({
        text: z.string().trim().min(1, "Text is required"),
        category: z.string().trim().min(1, "Category is required"),
    })
    .superRefine((data, ctx) => {
        const exists = db
            .prepare("SELECT 1 FROM categories WHERE name = ?")
            .get(data.category);

        if (!exists) {
            ctx.addIssue({
                code: "custom",
                message: `Unknown category: ${data.category}`,
                path: ["category"],
            })
        }
});

export const patchTodoSchema = z.object({
    completed: z.boolean(),
});

export function validateBody(schema: z.ZodType): RequestHandler {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
            error: "Validation failed",
            details: parsed.error.flatten(),
            });
        }
        req.body = parsed.data;
        next();
    };
}