const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class AskMe extends Model { }

AskMe.init(
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    answer: {
      type: DataTypes.STRING,
    },
    // instead of defining the userId field here
    // create a one to many relationship between
    // User model and AskMe model in models/index.js
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
