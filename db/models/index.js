const User = require("./User");
const Trip = require("./Trip");
const AskMe = require("./AskMe");
const List = require("./List");
const ListTrip = require("./ListTrip");

User.hasMany(Trip, { as: "trips", foreignKey: "userId", allowNull: false });
Trip.belongsTo(User, { as: "user" });

Trip.hasMany(AskMe, { as: "askMe", foreignKey: "tripId", allowNull: false });
AskMe.belongsTo(Trip, { as: "trip" });

User.hasMany(List, { as: "list", foreignKey: "userId", allowNull: false });
List.belongsTo(User, { as: "user" });

List.belongsToMany(Trip, { through: "ListTrip", foreignKey: "listId" });
Trip.belongsToMany(List, { through: "ListTrip", foreignKey: "tripId" });

module.exports = {
  User,
  Trip,
  AskMe,
  ListTrip,
  List,
};
