// Data
const { User } = require("../db/models");

const { Trip } = require("../db/models");

// slug
const slugify = require("slugify");

// List
exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);

    return trip;
  } catch (error) {
    next(error);
  }
};

//   Create
exports.tripCreate = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = `${req.protocol}://${req.get("host")}/media/${
    //     req.file.filename
    //   }`;
    // }

    req.body.userId = req.user.id;
    console.log("//////////", req.body);
    const newTrip = await Trip.create(req.body);

    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

//   Delete
exports.tripDelete = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.trip.userId) {
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
    if (req.user.role === "admin" || req.user.id === req.trip.userId) {
      // if (req.file) {
      //   req.body.image = `${req.protocol}://${req.get("host")}/media/${
      //     req.file.filename
      //   }`;
      // }

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
