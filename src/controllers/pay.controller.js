import { Pay } from "../models/Pay.js";
//Ver pagos
export async function getPays(req, res) {
    try {
        const pays = await Pay.findAll({
            attributes: ["id", "amount", "paymentDate", "patientId", "medicId"],
        });
        res.json(pays);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
//Crear pagos
export async function createPay(req, res) {
    const { amount, paymentDate, patientId, medicId } = req.body;
    try {
        let newPay = await Pay.create(
            {
              amount, 
              paymentDate, 
              patientId, 
              medicId
            },
            {
                fields: ["amount", "paymentDate", "patientId", "medicId"],
            }
        );
        return res.json(newPay);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}
//ver pagos con el id
export async function getPay(req, res) {
    const { id } = req.params;
    try {
        const pay = await Pay.findOne({
            where: {
                id: id,
            },
        });
        res.json(pay);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
//Actualizar pago
export async function updatePay(req, res) {
    try {
        const { id } = req.params;
        const { amount, paymentDate, patientId, medicId } = req.body;
        const pays = await Pays.findByPk(id);
        pays.amount = amount;
        pays.paymentDate = paymentDate;
        pays.patientId = patientId;
        pays.medicId = medicId;
        await pays.save();

        res.json(pays);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Eliminar pagos
export async function deletePay(req, res) {
    const { id } = req.params;
    try {
        await Pay.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
//ver pagos de un periodo determinado
import { Op } from 'sequelize';
//import Pay from './models/Pay'; // Ajusta la ruta según tu estructura de proyecto

// Ver pagos de un periodo determinado
export async function getPayPeriod(req, res) {
    const { startDate, endDate,id } = req.params;

    try {
        const pay = await Pay.findAll({
            where: {
                patientId:id,
                paymentDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });
        res.json(pay);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

