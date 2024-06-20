import { Queue } from "../models/Queue.js";
import { Specialty } from "../models/Specialty.js";
import { Medic } from "../models/Medic.js";
//ver colas
export async function getQueues(req, res) {
  try {
    const queue = await Queue.findAll({
      atributes: ["id","name", "specialtyId", "medicId", "ticketCount"],
      include: [{
        model: Specialty,
        attributes: ['name'], // Solo incluye el campo 'name' de la tabla Specialty
        as: 'specialty',
    },
    {
      model: Medic,
      attributes: ['name'], //  de la tabla medic
      as: 'medic',
    }
  ]
    });
    res.json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


// Crear cola
export async function createQueue(req, res) {
  const { name,specialtyId, medicId, ticketCount } = req.body;
  try {
    // Verificar si specialtyId se está recibiendo correctamente
    if (!specialtyId && !medicId) {
      return res.status(400).json({ error: 'specialtyId and medicId is required' });
    }

    // Asegúrate de que la especialidad existe
    const specialty = await Specialty.findByPk(specialtyId);
    const queue = await Medic.findByPk(medicId)
    if (!specialty && !queue) {
      return res.status(404).json({ error: 'Specialty not found' });
    }

    let newQueue = await Queue.create(
      {
        name,
        specialtyId,
        medicId,
        ticketCount
      },
      {
        fields: ["name","specialtyId","medicId", "ticketCount", ],
      }
    );
    return res.json(newQueue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//ver cola en con id
export async function getQueue(req, res) {
  const { id } = req.params;
  try {
    const queue = await Queue.findOne({
      where: {
        id,
      },
    });
    res.json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
//actualizar medicos
export const updateQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name,specialtyId, medicId, ticketCount } = req.body;

    const queue = await Queue.findByPk(id);
    queue.name = name;
    queue.medicId = medicId;
    queue.specialtyId = specialtyId;
    queue.ticketCount = ticketCount;
    await queue.save();

    res.json(queue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//eliminar cola
export async function deleteQueue(req, res) {
  const { id } = req.params;
  try {
    await Queue.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
//ver cola por especialdiad ------- y
export async function getQueueSpecialty(req, res) {
  const { id } = req.params;
  try {
    const queue = await Queue.findAll({
      attributes: ["id", "name","medicId", "specialtyId", "ticketCount"],
      where: { specialtyId: id },
    });
    res.json(queue);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
//ver cola por medicos
export async function getQueueMedic(req, res) {
  const { id } = req.params;
  try {
    const queue = await Queue.findAll({
      attributes: ["id","name", "medicId", "specialtyId", "ticketCount"],
      where: { medicId: id },
    });
    res.json(queue);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}