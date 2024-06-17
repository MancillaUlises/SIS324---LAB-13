import { User } from "../models/User.js";
import { Op } from 'sequelize';

// Ver usuarios
export async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id","fullname","username","password","role"],
    });
    res.json(users);
  } catch (error) {
    res.user(500).json({
      message: error.message,
    });
  }
}

// Crear usuario
export async function createUser(req, res) {
  const { fullname,username,password,role } = req.body;
  try {
    let newUser = await User.create(
      {
        fullname,
        username,
        password,
        role,
      },
      {
        fields: ["fullname","username","password","role"],
      }
    );
    return res.json(newUser);
  } catch (error) {
    res.user(500).json({
      message: error.message,
    });
  }
  res.json("received");
}
//actualizar usuarios
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname,username,password,role } = req.body;

    const user = await User.findByPk(id);
    user.fullname = fullname;
    user.username = username;
    user.password = password;
    user.role = role;
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//eliminar usuarios
export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserByUsername(req, res) {
  const { username } = req.query;
  try {
    const user = await User.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`
        }
      },
      attributes: ["id", "fullname", "username", "role"] // Excluir el password por razones de seguridad
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
