const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model { }

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    // missing bio field. Profiles should have a bio
  },
  {
    sequelize: db,
  }
);

module.exports = User;
