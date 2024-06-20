import { Ticket } from "../models/Ticket.js";
import { Patient } from "../models/Patient.js";
import { Queue } from "../models/Queue.js";//para las vistas
import { Medic } from "../models/Medic.js";//para el medico
import { Status } from "../models/Status.js";//para llamar cambio de estado
import { ConsultingRoom } from "../models/ConsultingRoom.js";//registrar el consultorio
import { Op } from 'sequelize';
// Ver tickets
export async function getTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            attributes: ["id", "code","queueId","medicId","emissionDate","statusId","consultingRoomId"],
          include: [{
              model: Status,
              attributes: ['name'], // Solo incluye el campo 'name' de la tabla Specialty
              as: 'status'
          },
          {
            model: ConsultingRoom,
            attributes: ['number'], //  de la tabla user
            as: 'consultingRoom'
          },
          {
            model: Medic,
            attributes: ['name'], // Solo incluye el campo 'name' de la tabla medic
            as: 'medic'
          },
          {
            model: Queue,
            attributes: ['name'], // Solo incluye el campo 'name' de la tabla cola
            as: 'queue'
          }
      ]
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
    const { code,queueId,medicId,emissionDate,statusId,consultingRoomId } = req.body;
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
                fields: ["code","queueId","medicId","emissionDate","statusId","consultingRoomId"],
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
//ver tickets con el id
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
//Actualizar tickets
export const updateTicket = async (req, res) => {
    try {
      const { id } = req.params;
      const { code,queueId,medicId,emissionDate,statusId,consultingRoomId } = req.body;
  
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
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  ////Llamar al ticket de una cola asociada a un paciente
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
//cambiar estado del ticket
export const updateStateTicket = async (req, res) => {
  const { id } = req.params;
  const { statusId } = req.body; // Cambiamos a req.body para recibir el statusId

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Cambios de estado válidos
    if (ticket.statusId === 1 && statusId === 2) { // De 'espera' a 'llamado'
      ticket.statusId = 2;
    } else if (ticket.statusId === 2 && statusId === 3) { // De 'llamado' a 'no responde'
      ticket.statusId = 3;
    } else if (ticket.statusId === 3 && statusId === 4) { // De 'no responde' a 'cancelado'
      ticket.statusId = 4;
    } else if (ticket.statusId === 2 && statusId === 5) { // De 'llamado' a 'atendiendo'
      ticket.statusId = 5;
    } else if (ticket.statusId === 5 && statusId === 6) { // De 'atendiendo' a 'concluido'
      ticket.statusId = 6;
    } else {
      return res.status(400).json({ message: 'Invalid status transition' });
    }

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
///ticker en fecha de un medico
export async function getTicketPeriodMedic(req, res) {
  const { startDate, endDate,medicId } = req.params;

  try {
      const ticket = await Ticket.findAll({
          where: {
              medicId:medicId,
              emissionDate: {
                  [Op.between]: [startDate, endDate],
              },
          },
      });
      res.json(ticket);
  } catch (error) {
      res.status(500).json({
          message: error.message,
      });
  }
}