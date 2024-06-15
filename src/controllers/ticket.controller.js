import { Ticket } from "../models/Ticket.js";
import { Patient } from "../models/Patient.js";
import { Queue } from "../models/Queue.js";//para las vistas
import { Medic } from "../models/Medic.js";//para el medico
import { Status } from "../models/Status.js";//para llamar cambio de estado
import { ConsultingRoom } from "../models/ConsultingRoom.js";//registrar el consultorio

// Ver tickets
export async function getTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            attributes: ["id", "code", "queueId", "medicId", "emissionDate", "statusId", "consultingRoomId"],
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

//Crear tickets
export async function createTicket(req, res) {
    const { code, queueId, medicId, emissionDate, statusId, consultingRoomId } = req.body;
    try {
        let newTicket = await Ticket.create(
            {
                code,
                queueId,
                medicId,
                emissionDate,
                statusId,
                consultingRoomId
            },
            {
                fields: ["code", "queueId", "medicId", "emissionDate", "statusId", "consultingRoomId"],
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

//Ver tickets con el Id
export async function getTicket(req, res) {
    const { id } = req.params;
    try {
        const tickets = await Ticket.findOne({
            where: {
                id,
            },
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

//Actualizar ticket
export const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, queueId, medicId, emissionDate, statusId, consultingRoomId } = req.body;

        const tickets = await Ticket.findByPk(id);
        tickets.code = code;
        tickets.queueId = queueId;
        tickets.medicId = medicId;
        tickets.emissionDate = emissionDate;
        tickets.status = statusId;
        tickets.consultingRoomId = consultingRoomId;
        await tickets.save();

        res.json(tickets);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Eliminar ticket
export async function deleteTicket(req, res) {
    const { id } = req.params;
    try {
        await Ticket.destroy({
            where: {
                id,
            },
        });
        res.json({ message: "Ticket deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

////
export async function getTicketsPatients(req, res) {
    try {
        const { id } = req.params;
        const patients = await Patient.findAll({
            where: {
                ticket_id: id
            },
        });
        res.json(patients);
    } catch (error) {
        return res.pa(500).json({ message: error.message });
    }
}
