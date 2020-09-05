const Sequelize = require("sequelize");
const config = require("../config");

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
