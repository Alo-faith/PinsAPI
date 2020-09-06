// Data
const { List, ListTrip } = require("../db/models");

exports.fetchList = async (listId, next) => {
  try {
    const list = await List.findByPk(listId);
    return list;
  } catch (error) {
    next(error);
  }
};

// List
exports.list = async (req, res, next) => {
  try {
    const list = await List.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(list);
  } catch (error) {
    next(error);
  }
};

// Delete
exports.deleteList = async (req, res, next) => {
  try {
    if (req.user.id === req.list.userId) {
      await req.list.destroy();
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
exports.updateList = async (req, res, next) => {
  try {
    if (req.user.id === req.list.userId) {
      await req.list.update(req.body);
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
// Create ListTrip
exports.createListTrip = async (req, res, next) => {
  try {
    if (req.user.id === req.list.userId) {
      req.body.listId = req.list.id;
      const newListTrip = await ListTrip.create(req.body);
      res.status(201).json(newListTrip);
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
// Delete listTrip
exports.deleteListTrip = async (req, res, next) => {
  try {
    if (req.user.id === req.list.userId) {
      const { tripId } = req.params;

      const listTrip = await ListTrip.findOne({
        where: { listId: req.list.id, tripId: tripId },
      });

      req.listTrip = listTrip;
      await req.listTrip.destroy();
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
