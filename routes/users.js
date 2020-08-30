const express = require("express");
const router = express.Router();

// Middleware
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  signup,
  signin,
  userList,
  userUpdate,
  fetchUsers,
} = require("../controllers/userController");

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUsers(userId, next);

  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("User not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", userList);

// Signup
router.post("/signup", signup);

// signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

// you don't need a user update.
// You can add a Feature where the user can update
// their first name, last name, email, and username.
// but don't build it for now, add it as a card in the Trello board's Icebox list
// Keep this comment here, we'll discuss it further in your Standup meeting on Monday.
// Update
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  userUpdate
);

module.exports = router;
