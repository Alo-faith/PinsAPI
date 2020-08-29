const User = require("./User");
const Trip = require("./Trip");
const QA = require("./QA");

User.hasMany(Trip, { as: "trips", foreignKey: "userId", allowNull: false });
Trip.belongsTo(User, { as: "user" });

Trip.hasMany(QA, { as: "qa", foreignKey: "tripId", allowNull: false });
QA.belongsTo(Trip, { as: "trip" });

module.exports = {
  User,
  Trip,
  QA,
};
