const express = require("express");

// Controllers
const {
  listTrip,
  deleteListTrip,
  fetchListTrip,
} = require("../controllers/ListTripController");

// Middleware
const passport = require("passport");
// REVIEW: Cleanup your requires
const router = express.Router();

// List
router.get("/", listTrip);

module.exports = router;
