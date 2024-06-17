import { Status } from "../models/Status.js";

// Ver estados
export async function getStatuses(req, res) {
  try {
    const statuses = await Status.findAll({
      attributes: ["id", "name"],
    });
    res.json(statuses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Crear estado
export async function createStatus(req, res) {
  const { name } = req.body;
  try {
    let newStatus = await Status.create(
      {
        name,
      },
      {
        fields: ["name"],
      }
    );
    return res.json(newStatus);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

// Ver estado por ID
export async function getStatus(req, res) {
  const { id } = req.params;
  try {
    const status = await Status.findOne({
      where: {
        id,
      },
    });
    res.json(status);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Actualizar estado
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const status = await Status.findByPk(id);
    status.name = name;
    await status.save();

    res.json(status);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar estado
export async function deleteStatus(req, res) {
  const { id } = req.params;
  try {
    await Status.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
