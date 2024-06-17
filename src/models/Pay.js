import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Pay = sequelize.define("pays", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.FLOAT,
    },
    paymentDate: {
        type: DataTypes.DATE,
    },
    patientId: {
        type: DataTypes.INTEGER,
    },
    medicId: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false,
});

