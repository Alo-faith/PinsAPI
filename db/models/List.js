const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class List extends Model {}

List.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    defaultList: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = List;
