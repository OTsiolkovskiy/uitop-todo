import { Router } from "express";
import { createTodo, getTodos } from "../services/todoService.js";

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
})

export default router;
