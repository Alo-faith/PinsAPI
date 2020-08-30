// Data
const { QA } = require("../db/models");

exports.fetchQA = async (qaId, next) => {
  try {
    const qa = await QA.findByPk(qaId);

    return qa;
  } catch (error) {
    next(error);
  }
};

// List
// this controller should return a list of questions
// and each question's answer
// this'll change when you change the models
// take your time building the feature, don't rush it.
exports.qaList = async (req, res, next) => {
  try {
    const qa = await QA.findAll({});

    res.json(qa);
  } catch (error) {
    next(error);
  }
};

// Delete
// theres no delete feature, remove this controller.
exports.qaDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.qa.userId) {
      await req.qa.destroy();
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
// theres no update feature, remove this controller.
exports.qaUpdate = async (req, res, next) => {
  try {
    // console.log(",,,,", req.qa.userId);
    // if (req.user.id === req.qa.userId) {
    await req.qa.update(req.body);
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
