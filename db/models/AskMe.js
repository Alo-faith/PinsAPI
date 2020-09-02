const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class AskMe extends Model {}

AskMe.init(
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    answer: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = AskMe;
