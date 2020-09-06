const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Ask extends Model {}

Ask.init(
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    answer: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Ask;
