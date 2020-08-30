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
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = QA;
