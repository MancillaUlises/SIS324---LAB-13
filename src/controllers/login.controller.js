import { User } from '../models/User.js';
import { Medic } from '../models/Medic.js';

export async function login(req, res) {
    const { username, password } = req.body;
    console.log("usuario: ", username, password);

    try {
        // Buscar el usuario por el username
        const user = await User.findOne({
            where: { username }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Verificar la contraseña
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Verificar si el usuario está vinculado a un medico
        const medic = await Medic.findOne({
            where: { userId: user.id }
        });
        if (!medic) {
            return res.status(404).json({ message: "Medic not found for this user" });
        }
        // Si es correcto, devolver la información del usuario y del medico
        res.json({ user, medic });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: error.message,
        });
    }
}
