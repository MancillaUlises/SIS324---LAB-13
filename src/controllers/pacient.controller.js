import { Pacient } from "../models/Pacient.js";

export async function getPacients(req, res) {
    try {
        const pacients = await Pacient.findAll({
            atributes: ["id_paciente", "nombre", "apellido", "fecha_nacimiento", "correo", "celular"],
        });
        res.json(pacients);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function createPacients(req, res) {
    const { nombre, apellido, fecha_nacimiento, correo, celular, ticket_id } = req.body;
    try {
        let newPacient = await Pacient.create(
            {
                nombre,
                apellido,
                fecha_nacimiento,
                correo,
                celular,
                ticket_id
            },
            {
                fields: ["nombre", "apellido", "fecha_nacimiento", "correo", "celular", "ticket_id"],
            }
        );
        return res.json(newPacient);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}