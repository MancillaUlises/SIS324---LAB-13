import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Patient = sequelize.define("patients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  birthDate: {
    type: DataTypes.DATE,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  ticketId: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
});
