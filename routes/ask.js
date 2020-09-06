const express = require("express");

// Controllers
const {
  askList,
  answerUpdate,
  askDelete,
  fetchAsk,
} = require("../controllers/AskController");

// Middleware
const passport = require("passport");

const router = express.Router();

router.param("askId", async (req, res, next, askId) => {
  const ask = await fetchAsk(askId, next);
  if (ask) {
    req.ask = ask;
    next();
  } else {
    const err = new Error("not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", askList);

// Delete
router.delete(
  "/:askId",
  passport.authenticate("jwt", { session: false }),
  askDelete
);

// Update
router.put(
  "/:askId",
  // passport.authenticate("jwt", { session: false }),
  answerUpdate
);

module.exports = router;
