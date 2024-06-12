import { Router } from "express";
import {
  getPacients,
  createPacients,
} from "../controllers/pacient.controller.js"

const router = Router();

// Routes
router.post("/", createPacients);
router.get("/", getPacients);

export default router;