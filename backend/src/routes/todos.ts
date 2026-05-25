import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../services/todoService.js";

const router = Router();

router.get("/", (req, res) => {
    const category = typeof req.query.category === "string" ? req.query.category : "All";

    res.json(getTodos(category))
});

router.post("/", (req, res, next) => {
    try {
        const { text, category } = req.body ?? {};
        const todo = createTodo({ text, category});
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
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
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        deleteTodo(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

export default router;
