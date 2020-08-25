const User = require("./User");
const Trip = require("./Trip");

User.hasMany(Trip, { as: "trips", foreignKey: "userId", allowNull: false });

Trip.belongsTo(User, { as: "user" });

module.exports = {
  User,
  Trip,
};
