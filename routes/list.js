const express = require("express");

// Controllers
const {
  list,
  updateList,
  deleteList,
  fetchList,
  createList,
} = require("../controllers/ListController");

// Middleware
const passport = require("passport");

const router = express.Router();

router.param("listId", async (req, res, next, listId) => {
  const list = await fetchList(listId, next);
  if (list) {
    req.list = list;
    next();
  } else {
    const err = new Error("list not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", list);

// Delete
router.delete(
  "/:listId",
  // passport.authenticate("jwt", { session: false }),
  deleteList
);

// Update
router.put(
  "/:listId",
  passport.authenticate("jwt", { session: false }),
  updateList
);

module.exports = router;
