const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class ListTrip extends Model {}

ListTrip.init(
  {},
  {
    sequelize: db,
  }
);

module.exports = ListTrip;
