const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class List extends Model {}

List.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },
  },
  {
    sequelize: db,
  }
);

module.exports = List;
