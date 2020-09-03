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
  deleteUser,
  fetchUser,
  createList,
} = require("../controllers/userController");

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);

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

// Delete
router.delete(
  "/:userId",
  // passport.authenticate("jwt", { session: false }),
  deleteUser
);

// Update
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  userUpdate
);

// you don't need the parameter here
// you're using the logged in user's ID
// as you should.
// Create list
router.post(
  "/:userId/list",
  passport.authenticate("jwt", { session: false }),
  createList
);

module.exports = router;
