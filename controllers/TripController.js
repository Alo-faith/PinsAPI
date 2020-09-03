// Data
const { Trip, AskMe } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

// List
exports.tripList = async (req, res, next) => {
  try {
    // why is exclude commented out?
    // if you won't use it, remove it.
    const trips = await Trip.findAll({
      // attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// Create
exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
        }`;
    }

    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);

    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

// Delete
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

// Update
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

// Create Q
exports.createQuestion = async (req, res, next) => {
  try {
    const newQ = await AskMe.create(req.body);
    console.log("............req.body", req.body); // remove console logs before pushing

    res.status(201).json(newQ);
  } catch (error) {
    next(error);
  }
};
