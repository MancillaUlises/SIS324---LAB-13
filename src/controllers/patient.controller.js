import { Patient } from "../models/Patient.js";
//Ver pacientes
export async function getPatients(req, res) {
    try {
        const patients = await Patient.findAll({
            attributes: ["id", "name", "birthDate", "email", "phone","ticketId"],
        });
        res.json(patients);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
//Crear pacientes
export async function createPatient(req, res) {
    const { name, birthDate, email, phone, ticketId } = req.body;
    try {
        let newPatient = await Patient.create(
            {
                 name, 
                 birthDate, 
                 email, 
                 phone,
                 ticketId
            },
            {
                fields: [ "name", "birthDate", "email", "phone","ticketId"],
            }
        );
        return res.json(newPatient);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}
//ver pacientes con el id
export async function getPatient(req, res) {
    const { id } = req.params;
    try {
        const patient = await Patient.findOne({
            where: {
                id: id,
            },
        });
        res.json(patient);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
//Actualizar pacientes
export async function updatePatient(req, res) {
    try {
        const { id } = req.params;
        const { name, birthDate, email, phone, ticketId } = req.body;
        const patients = await Patients.findByPk(id);
        patients.name = name;
        patients.birthDate = birthDate;
        patients.email = email;
        patients.phone = phone;
        patients.ticketId = ticketId;
        await patients.save();

        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Eliminar pacientes
export async function deletePatient(req, res) {
    const { id } = req.params;
    try {
        await Patient.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


