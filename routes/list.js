const express = require("express");

// Controllers
const {
  list,
  updateList,
  deleteList,
  fetchList,
  createListTrip,
  deleteListTrip,
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

// Delete list
router.delete(
  "/:listId",
  passport.authenticate("jwt", { session: false }),
  deleteList
);

// Update list
router.put(
  "/:listId",
  passport.authenticate("jwt", { session: false }),
  updateList
);
// Create ListTrip
router.post(
  "/:listId",
  passport.authenticate("jwt", { session: false }),
  createListTrip
);
// Delete listTrip
router.delete(
  "/:listId/trips/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteListTrip
);

module.exports = router;
