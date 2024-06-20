import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Specialty } from "./Specialty.js";

export const Medic = sequelize.define(
  "medics",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    specialtyId: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      default: ""
    },
    services: {
      type: DataTypes.STRING,
      default: ""
    },

    certifications: {
      type: DataTypes.STRING,
      default: ""
    },
    state: {
      type: DataTypes.STRING,
      default: "activo"
    }
  },
  {
    timestamps: false,
  }
);