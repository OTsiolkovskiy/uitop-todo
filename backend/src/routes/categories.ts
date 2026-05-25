import { Router } from "express";
import { getCategories } from "../services/todoService.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(getCategories())
});

export default router;
