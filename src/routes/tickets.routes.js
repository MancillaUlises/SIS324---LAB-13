import { Router } from "express";
import {
    getTickets,
    createTicket,
    updateTicket,
    getTicket,
    deleteTicket,
    getTicketsPatients,
    } from "../controllers/ticket.controller.js";

    const router = Router();

// Routes
router.post("/", createTicket);
router.get("/", getTickets);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.get("/:id", getTicket);
router.get("/:id/pacients", getTicketsPatients);

export default router;