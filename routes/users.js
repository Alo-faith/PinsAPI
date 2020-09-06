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
  tripCreate,
  createList,
} = require("../controllers/userController");

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);

  if (user) {
    req._user = user;
    next();
  } else {
    const err = new Error("User not found");
    err.status = 404;
    next(err);
  }
});

// User list
router.get("/", userList);

// Signup
router.post("/signup", signup);

// signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// Delete user used only in BE
router.delete("/:userId", deleteUser);

// Update user profile
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  userUpdate
);
// Create trip
router.post(
  "/:userId/trip",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);

// Create list
router.post(
  "/:userId/list",
  passport.authenticate("jwt", { session: false }),
  createList
);

module.exports = router;
