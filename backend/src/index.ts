import express from "express";
import cors from "cors";
import "./db.js";
import categoriesRouter from "./routes/categories.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})