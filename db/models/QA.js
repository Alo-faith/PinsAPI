const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class QA extends Model {}

// No no no no no no........
// A Question model, and a separate Answer model,
// and a relationship between them (think about the relationship)

QA.init(
  {
    // seriously, use meaningful names -.-
    q: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // you get a -1 out of 10 for naming
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
