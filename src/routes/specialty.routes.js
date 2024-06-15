import { Router } from "express";
import {
    getSpecialtys,
    createSpecialty,
    updateSpecialty,
    getSpecialty,
    deleteSpecialty,
} from "../controllers/specialty.controller.js";

const router = Router();

// Routes
router.post("/", createSpecialty);
router.get("/", getSpecialtys);
router.put("/:id", updateSpecialty);
router.delete("/:id", deleteSpecialty);
router.get("/:id", getSpecialty);

export default router;