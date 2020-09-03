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
    // why remove exclude?
    const list = await List.findAll({
      // attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(list);
  } catch (error) {
    next(error);
  }
};

// Delete
exports.deleteList = async (req, res, next) => {
  try {
    // bring back this condition to set permissions
    //  if (req.user.id === req.list.userId) {
    await req.list.destroy();
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
exports.updateList = async (req, res, next) => {
  try {
    if (req.user.id === req.trip.userId) {
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
