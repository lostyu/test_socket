const Sequelize = require("sequelize");
const db = require("../db/db");

const User = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    expires: {
      type: Sequelize.STRING(100),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
