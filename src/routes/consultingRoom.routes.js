import { Router } from "express";
import {
  getConsultingRooms,
  createConsultingRoom,
  getConsultingRoom,
  updateConsultingRoom,
  deleteConsultingRoom,
} from "../controllers/consultingRoom.controller.js";

const router = Router();

// Routes
router.post("/", createConsultingRoom);
router.get("/", getConsultingRooms);
router.put("/:id", updateConsultingRoom);
router.delete("/:id", deleteConsultingRoom);
router.get("/:id", getConsultingRoom);

export default router;