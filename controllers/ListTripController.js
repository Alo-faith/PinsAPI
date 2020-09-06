// Data
const { ListTrip } = require("../db/models");

exports.fetchListTrip = async (listTripId, next) => {
  try {
    const listTrip = await List.findByPk(listTripId);
    return listTrip;
  } catch (error) {
    next(error);
  }
};

// List
exports.listTrip = async (req, res, next) => {
  try {
    const list = await ListTrip.findAll({});

    res.json(list);
  } catch (error) {
    next(error);
  }
};
