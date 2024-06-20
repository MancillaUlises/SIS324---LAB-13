import { Medic } from "../models/Medic.js";
import { Specialty } from "../models/Specialty.js";
import { User } from "../models/User.js"

//ver medicos
export async function getMedics(req, res) {
  try {
      const medics = await Medic.findAll({
          attributes: ["id", "name", "specialtyId", "phone", "userId", "image", "services", "certifications", "state"],
          include: [{
              model: Specialty,
              attributes: ['name'], // Solo incluye el campo 'name' de la tabla Specialty
              as: 'specialty'
          },
          {
            model: User,
            attributes: ['username','role'], //  de la tabla user
            as: 'user'
        }]
      });
      res.json(medics);
  } catch (error) {
      res.status(500).json({
          message: error.message,
      });
  }
}

// Crear medicos
export async function createMedic(req, res) {
  const { name, specialtyId, phone, userId , image, services, certifications, state } = req.body;
  try {
    // Asegúrate de que la especialidad existe
    const specialty = await Specialty.findByPk(specialtyId);
    if (!specialty) {
      return res.status(404).json({ error: 'Specialty not found' });
    }
    // Asegúrate de que el usuario exista
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let newMedic = await Medic.create(
      {
        name,
        specialtyId,
        phone,
        userId,
        image,
        services,
        certifications,
        state,
      },
      {
        fields: ["name", "specialtyId", "phone", "userId" , "image", "services", "certifications", "state"],
      }
    );
    return res.json(newMedic);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//ver medicos con el Id
export async function getMedic(req, res) {
  const { id } = req.params;
  try {
    const medic = await Medic.findOne({
      where: {
        id,
      },
    });
    res.json(medic);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//actualizar medicos
export const updateMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialtyId, phone, userId, image, services, certifications, state } = req.body;

    const medic = await Medic.findByPk(id);
    medic.name = name;
    medic.specialtyId = specialtyId;
    medic.phone = phone;
    medic.userId = userId;
    medic.image = image;
    medic.services = services;
    medic.certifications = certifications;
    medic.state = state;
    await medic.save();

    res.json(medic);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//eliminar medicos
export async function deleteMedic(req, res) {
  const { id } = req.params;
  try {
    await Medic.destroy({
      where: {
        id,
      },
    });
    
    res.json({ message: "Medic deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//ver medicos por especialdiad ------- cambiar por el contenido de la tabla specialty
export async function getMedicOffices(req, res) {
  const { id } = req.params;
  try {
    const offices = await Office.findAll({
      attributes: ["id", "medicId", "name"],
      where: { medicId: id },
    });
    res.json(offices);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}