import { ConsultingRoom } from "../models/ConsultingRoom.js";
import { Specialty } from "../models/Specialty.js";
import { Medic } from "../models/Medic.js";
//ver consultorios
export async function getConsultingRooms(req, res) {
  try {
    const consultingRooms = await ConsultingRoom.findAll({
      atributes: ["id", "number", "medicId", "specialtyId",  "location"],
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
    res.json(consultingRooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
//import { Specialty } from '../models/Specialty.js';

// Crear consultorios
export async function createConsultingRoom(req, res) {
  const { number, medicId, specialtyId, location } = req.body;
  try {
    // Verificar si specialtyId se está recibiendo correctamente
    if (!specialtyId && !medicId) {
      return res.status(400).json({ error: 'specialtyId and medicId is required' });
    }

    // Asegúrate de que la especialidad existe y medic
    const specialty = await Specialty.findByPk(specialtyId);
    const medic = await Medic.findByPk(medicId)
    if (!specialty && !medic) {
      return res.status(404).json({ error: 'Specialty not found' });
    }

    let newCosultingRoom = await ConsultingRoom.create(
      {
        number,
        medicId,
        specialtyId,
        location
      },
      {
        fields: ["number", "medicId", "specialtyId", "location", ],
      }
    );
    return res.json(newCosultingRoom);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//ver consultorios con id
export async function getConsultingRoom(req, res) {
  const { id } = req.params;
  try {
    const consultingRoom = await ConsultingRoom.findOne({
      where: {
        id,
      },
    });
    res.json(consultingRoom);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
//actualizar consultorios
export const updateConsultingRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, medicId, specialtyId, location } = req.body;

    const consultingRoom = await ConsultingRoom.findByPk(id);
    consultingRoom.number = number;
    consultingRoom.medicId = medicId;
    consultingRoom.specialtyId = specialtyId;
    consultingRoom.location = location;
    await consultingRoom.save();

    res.json(consultingRoom);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//eliminar consultorios
export async function deleteConsultingRoom(req, res) {
  const { id } = req.params;
  try {
    await ConsultingRoom.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
