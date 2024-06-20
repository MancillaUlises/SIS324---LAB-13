import { Router } from "express";
import {
    getTickets,
    createTicket,
    updateTicket,
    getTicket,
    deleteTicket,
    getTicketsPatients,
    updateStateTicket,
    getTicketPeriodMedic
    } from "../controllers/ticket.controller.js";

    const router = Router();

// Routes
router.post("/", createTicket);
router.get("/", getTickets);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.get("/:id", getTicket);
router.get("/:id/patients", getTicketsPatients);
router.put("/state/:id", updateStateTicket);
router.get("/:medicId/:startDate/:endDate",getTicketPeriodMedic)
export default router;