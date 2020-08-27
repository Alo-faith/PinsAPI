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

// REVIEW: If you only have one route using `:userId` you don't need this middleware. We use it when more than one component is using the route param.

// Also we don't pass the user ID in the URL, it's not safe. To update a user, you get the ID from `req.user` which you get from the jwt strategy.

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUsers(userId, next);
  // REVIEW: remove console log
  console.log("//////////", user);
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

// Update
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  userUpdate
);

module.exports = router;
