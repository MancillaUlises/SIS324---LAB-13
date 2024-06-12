import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Pacient } from "./Pacient.js";

export const Ticket = sequelize.define(
    "tickets",
    {
        id_ticket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        codigo: {
        type: DataTypes.STRING,
        }
    },
    {
        timestamps: false,
    }
);
Ticket.hasOne(Pacient,{
    foreignKey:'ticket_id',
    sourceKey:'id_ticket'
});

Pacient.belongsTo(Ticket, {
    foreignKey: 'ticket_id',
    targetId:'id_ticket'
});