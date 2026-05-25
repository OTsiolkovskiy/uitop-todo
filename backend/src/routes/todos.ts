import { Router } from "express";
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../services/todoService.js";
import {
    createTodoSchema,
    patchTodoSchema,
    validateBody,
} from "../middleware/validate.js";

const router = Router();

function parseId(param: string | string[] | undefined): number | null {
    if (typeof param !== "string") {
        return null;
    }
    
    const id = Number(param);
    return Number.isNaN(id) ? null : id;
}

router.get("/", (req, res) => {
    const category =
        typeof req.query.category === "string" ? req.query.category : undefined;

    res.json(getTodos(category));
});

router.post("/", validateBody(createTodoSchema), (req, res, next) => {
    try {
        const todo = createTodo(req.body);
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", validateBody(patchTodoSchema), (req, res, next) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const todo = updateTodo(id, req.body.completed);
        res.json(todo);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", (req, res, next) => {
    try {
        const id = parseId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        deleteTodo(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
