import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Pacient = sequelize.define(
    "pacients",
    {
        id_paciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
        },
        correo: {
            type: DataTypes.STRING,
        },
        celular: {
            type: DataTypes.STRING,
        }

    },
    {
        timestamps: false,
    }

);