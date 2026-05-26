import express from "express";
import cors from "cors";
import "./db.js";
import categoriesRouter from "./routes/categories.js";
import todosRouter from "./routes/todos.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/todos", todosRouter);

app.use((
    err: Error & { status?: number },
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
) => {
    const status = err.status ?? 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: err.message })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
