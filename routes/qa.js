const express = require("express");

// Controllers
const {
  qaCreate,
  qaList,
  qaUpdate,
  qaDelete,
  fetchQA,
} = require("../controllers/QAcontroller");

// Middleware
const passport = require("passport");

const router = express.Router();

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

// Delete
router.delete(
  "/:qaId",
  passport.authenticate("jwt", { session: false }),
  qaDelete
);

// Update
router.put(
  "/:qaId",
  passport.authenticate("jwt", { session: false }),
  qaUpdate
);

module.exports = router;
