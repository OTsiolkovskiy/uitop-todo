import { z } from "zod";

export const createTodoSchema = z.object({
    text: z.string().trim().min(1, "Text is required"),
    category: z.string().trim().min(1, "Select a category"),
});

export type CreateTodoSchema = z.infer<typeof createTodoSchema>;
