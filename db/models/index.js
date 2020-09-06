const User = require("./User");
const Trip = require("./Trip");
const Ask = require("./Ask");
const List = require("./List");
const ListTrip = require("./ListTrip");

User.hasMany(Trip, { as: "trips", foreignKey: "userId", allowNull: false });
Trip.belongsTo(User, { as: "user" });

Trip.hasMany(Ask, { as: "ask", foreignKey: "tripId", allowNull: false });
Ask.belongsTo(Trip, { as: "trip" });

User.hasMany(Ask, { as: "ask", foreignKey: "userId", allowNull: false });
Ask.belongsTo(User, { as: "user" });

User.hasMany(List, { as: "list", foreignKey: "userId", allowNull: false });
List.belongsTo(User, { as: "user" });

List.belongsToMany(Trip, { through: "ListTrip", foreignKey: "listId" });
Trip.belongsToMany(List, { through: "ListTrip", foreignKey: "tripId" });

module.exports = {
  User,
  Trip,
  Ask,
  ListTrip,
  List,
};
