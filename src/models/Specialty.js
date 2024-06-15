import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Specialty = sequelize.define("specialties", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});
