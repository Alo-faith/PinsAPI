// Data
const { Trip, Ask } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

// Trip List
exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// Delete Trip
exports.tripDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.trip.userId) {
      await req.trip.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Update Trip
exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.trip.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      await req.trip.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
//   Create Question
exports.createQuestion = async (req, res, next) => {
  try {
    if (req.user.id !== req.trip.userId) {
      req.body.userId = req.user.id;
      req.body.tripId = req.trip.id;
      const newQ = await Ask.create(req.body);
      res.status(201).json(newQ);
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
