import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

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
    speciality: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
//        default: "xxx.gmail.com"
      },
    image: {
        type: DataTypes.STRING,
        default :""
      },
    services: {
        type: DataTypes.STRING,
        default :""
      },
  
     certifications: {
        type: DataTypes.STRING,
        default :""
      },
     state: {
        type: DataTypes.STRING,
        default :"activo"
      }
    },
    {  timestamps: false,
      }
);

// Medic.hasMany(Task, {
//  foreinkey: "medicId",
//   sourceKey: "id",
// });
// Office.belongsTo(Medic, { foreinkey: "medicId", targetId: "id" });