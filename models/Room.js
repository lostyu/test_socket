const Sequelize = require("sequelize");
const db = require("../db/db");

const Room = db.define(
  "rooms",
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    roomNum: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    createUser: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER(10),
      defaultValue: 1, // 1请求通话     //2通话中       //0通话结束
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Room;
