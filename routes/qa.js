const express = require("express");

// Give this file a more meaningful name.
// I still don't know what this means until I read the code. Bad naming.

// Controllers
const {
  qaList,
  qaUpdate,
  qaDelete,
  fetchQA,
} = require("../controllers/QAcontroller");

// Middleware
const passport = require("passport");

const router = express.Router();

/**
 * * At this point, you should create a new branch just to rename all the "qa"s,
 * * Then test the BE to make sure everything still works.
 */

router.param("qaId", async (req, res, next, qaId) => {
  const qa = await fetchQA(qaId, next);
  if (qa) {
    req.qa = qa;
    next();
  } else {
    const err = new Error(" not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", qaList);

// theres no delete feature, remove this route
// Delete
router.delete(
  "/:qaId",
  passport.authenticate("jwt", { session: false }),
  qaDelete
);

// theres no update feature, remove this route
// Update
router.put(
  "/:qaId",
  // passport.authenticate("jwt", { session: false }),
  qaUpdate
);

module.exports = router;
