const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class QA extends Model {}

QA.init(
  {
    q: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    a: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = QA;
