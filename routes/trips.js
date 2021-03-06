const express = require("express");

// Controllers
const {
  tripCreate,
  tripList,
  tripUpdate,
  tripDelete,
  fetchTrip,
  createQuestion,
} = require("../controllers/TripController");

// Middleware
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip not found");
    err.status = 404;
    next(err);
  }
});

// Trip list
router.get("/", tripList);

// Delete trip
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);
// Update trip
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripUpdate
);
// Create question
router.post(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  createQuestion
);

module.exports = router;
