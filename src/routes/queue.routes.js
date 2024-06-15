import { Router } from "express";
import {
  getQueues,
  createQueue,
  getQueue,
  updateQueue,
  deleteQueue,
  getQueueSpecialty,
  getQueueMedic,
} from "../controllers/queue.controller.js";

const router = Router();

// Routes
router.post("/", createQueue);
router.get("/", getQueues);
router.put("/:id", updateQueue);
router.delete("/:id", deleteQueue);
router.get("/:id", getQueue);

router.get("/:id/specialty", getQueueSpecialty);
router.get("/:id/medic", getQueueMedic);

export default router;