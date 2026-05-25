import { Router } from "express";
import { getTodos } from "../services/todoService.js";

const router = Router();

router.get("/", (req, res) => {
    const category = typeof req.query.category === "string" ? req.query.category : "All";

    res.json(getTodos(category))
});

export default router;
