import Sequelize from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: 'sequelize.sqlite',
  });
  
// export const sequelize = new Sequelize(
//  "projectsdb",SIS324,
//  "postgres",postgres,
//  "mysecretpassword",
//  {
//    host: "localhost",
//    dialect: "sqlite",
//     pool: {
//       max: 5,
//       min: 0,
//       require: 30000,
//       idle: 10000,
//     },
//     logging: false,
//  }
// );