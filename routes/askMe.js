const express = require("express");

// Controllers
const {
  askMeList,
  answerUpdate,
  askMeDelete,
  fetchAskMe,
} = require("../controllers/AskMeController");

// Middleware
const passport = require("passport");

const router = express.Router();

router.param("askMeId", async (req, res, next, askMeId) => {
  const askMe = await fetchAskMe(askMeId, next);
  if (askMe) {
    req.askMe = askMe;
    next();
  } else {
    const err = new Error("not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", askMeList);

// Delete
router.delete(
  "/:askMeId",
  passport.authenticate("jwt", { session: false }),
  askMeDelete
);

// Update
router.put(
  "/:askMeId",
  // you need this passport middleware so that only logged in users can update
  // passport.authenticate("jwt", { session: false }),
  answerUpdate
);

module.exports = router;
