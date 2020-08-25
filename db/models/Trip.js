const { DataTypes, Model } = require("sequelize");
const db = require("../db");

//   slug
const SequelizeSlugify = require("sequelize-slugify");

class Trip extends Model {}

Trip.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
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
SequelizeSlugify.slugifyModel(Trip, {
  source: ["title"],
});
module.exports = Trip;
