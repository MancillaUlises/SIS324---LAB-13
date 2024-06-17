import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Queue = sequelize.define("queues", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  specialtyId: {
    type: DataTypes.INTEGER,
  },
  medicId: {
    type: DataTypes.INTEGER,
  },
  ticketCount: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
});
