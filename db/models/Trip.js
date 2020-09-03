const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Trip extends Model { }

Trip.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Trip;
