import { Router } from "express";
import {
  getTickets,
  createTickets,
  getTicketsPacients,
} from "../controllers/ticket.controller.js"

const router = Router();

// Routes
router.post("/", createTickets);
router.get("/", getTickets);
router.get("/:id/pacients", getTicketsPacients);

export default router;