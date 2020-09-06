// Data
const { Ask } = require("../db/models");

const { fetchTrip } = require("../controllers/TripController");

exports.fetchAsk = async (askId, next) => {
  try {
    const ask = await Ask.findByPk(askId);
    return ask;
  } catch (error) {
    next(error);
  }
};

// List
exports.askList = async (req, res, next) => {
  try {
    const ask = await Ask.findAll();
    res.json(ask);
  } catch (error) {
    next(error);
  }
};

// Delete
exports.askDelete = async (req, res, next) => {
  try {
    //  if (req.user.id === req.ask.userId) {
    await req.ask.destroy();
    res.status(204).end();
    // } else {
    //   const err = new Error("Unauthoized");
    //   err.status = 401;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};

// Update
exports.answerUpdate = async (req, res, next) => {
  try {
    // const ask = await fetchTrip(req.ask.tripId, next);

    // if (req.user.id === ask.userId) {
    await req.ask.update(req.body);
    res.status(204).end();
    // } else {
    //   const err = new Error("Unauthoized");
    //   err.status = 401;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};
