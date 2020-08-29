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

// Update
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  userUpdate
);

module.exports = router;
