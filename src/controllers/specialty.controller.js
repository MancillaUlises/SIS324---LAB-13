import { Specialty } from "../models/Specialty.js";

// Ver especialidades
export async function getSpecialtys(req, res) {
  try {
    const specialitys = await Specialty.findAll({
      attributes: ["id", "name"],
    });
    res.json(specialitys);
  } catch (error) {
    res.speciality(500).json({
      message: error.message,
    });
  }
}

// Crear especialidad
export async function createSpecialty(req, res) {
  const { name } = req.body;
  try {
    let newSpecialty = await Specialty.create(
      {
        name,
      },
      {
        fields: ["name"],
      }
    );
    return res.json(newSpecialty);
  } catch (error) {
    res.speciality(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

// Ver especialidad por ID
export async function getSpecialty(req, res) {
  const { id } = req.params;
  try {
    const speciality = await Specialty.findOne({
      where: {
        id,
      },
    });
    res.json(speciality);
  } catch (error) {
    res.speciality(500).json({
      message: error.message,
    });
  }
}

// Actualizar especialidad
export const updateSpecialty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const speciality = await Specialty.findByPk(id);
    speciality.name = name;
    await speciality.save();

    res.json(speciality);
  } catch (error) {
    return res.speciality(500).json({ message: error.message });
  }
};

// Eliminar especialidad
export async function deleteSpecialty(req, res) {
  const { id } = req.params;
  try {
    await Specialty.destroy({
      where: {
        id,
      },
    });
    return res.sendSpecialty(204);
  } catch (error) {
    return res.speciality(500).json({ message: error.message });
  }
}
