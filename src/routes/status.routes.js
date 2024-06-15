import { Router } from "express";
import {
    getStatuses,
    createStatus,
    updateStatus,
    getStatus,
    deleteStatus,
} from "../controllers/status.controller.js";

const router = Router();

// Routes
router.post("/", createStatus);
router.get("/", getStatuses);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);
router.get("/:id", getStatus);

export default router;