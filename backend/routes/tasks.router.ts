import { Router } from "express";

import { authMiddleware } from "../middlewares/JWTAuth";
import * as tasksController from "../controllers/tasks.controller"

const router = Router()

router.post("/", authMiddleware, tasksController.createTask);
router.get("/", authMiddleware, tasksController.readAllTasks);
router.get("/:id", authMiddleware, tasksController.readOneTask);
router.put("/:id", authMiddleware, tasksController.updateTask);
router.delete("/:id", authMiddleware, tasksController.deleteTask);

export default router;