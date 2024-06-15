import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ConsultingRoom = sequelize.define("consultingRooms", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.INTEGER,
  },
  medicId: {
    type: DataTypes.INTEGER,
  },
  specialtyId: {
    type: DataTypes.INTEGER,
  },
  location: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});
