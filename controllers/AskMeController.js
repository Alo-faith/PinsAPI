// Data
const { AskMe } = require("../db/models");

exports.fetchAskMe = async (askMeId, next) => {
  try {
    const askMe = await AskMe.findByPk(askMeId);
    return askMe;
  } catch (error) {
    next(error);
  }
};

// List
exports.askMeList = async (req, res, next) => {
  try {
    const askMe = await AskMe.findAll();

    res.json(askMe);
  } catch (error) {
    next(error);
  }
};

// Delete
exports.askMeDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.askMe.userId) {
      await req.askMe.destroy();
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
exports.answerUpdate = async (req, res, next) => {
  try {
    // remove console log
    // console.log(",,,,", req.askMe.userId);
    // you need this condition to set permissions
    // if (req.user.id === req.askMe.userId) {
    await req.askMe.update(req.body);
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
