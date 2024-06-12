import {Ticket} from "../models/Ticket.js";
import { Pacient } from "../models/Pacient.js";

export async function getTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            atributes: ["id_ticket", "codigo"],
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function createTickets(req,res){
    const {codigo} = req.body;
    try {
        let newTicket = await Ticket.create(
            {
                codigo,
            },
            {
                fields: ["codigo"],
            }
        );
        return res.json(newTicket);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getTicketsPacients(req, res) {
    try {
        const { id } = req.params;
        const pacients = await Pacient.findAll({
            where: {
                ticket_id:id
            },
        });
        res.json(pacients);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}