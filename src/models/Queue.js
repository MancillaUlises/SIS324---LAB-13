import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Queue = sequelize.define("queues", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  medicId: {
    type: DataTypes.INTEGER,
  },
  specialtyId: {
    type: DataTypes.INTEGER,
  },
  ticketCount: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
});
