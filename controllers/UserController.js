const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

// Database
const { User } = require("../db/models");

// rename to `fetchUser` (singular)
exports.fetchUsers = async (userId, next) => {
  try {
    const users = await User.findByPk(userId);

    return users;
  } catch (error) {
    next(error);
  }
};

/**
 * * What is this controller for? Do you ever need a list of users?
 * * Which Feature in the project's Trello board is this for?
 * * Why do you need a list of users?
 * ? The answer is no, you don't need it.
 */
exports.userList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    // In your standup on Monday, we'll discuss the Profile features
    // which will make changes to your code here

    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,

      // exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,

    // exp: Date.now() + JWT_EXPIRATION_MS, // why is this commented?
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// Update
exports.userUpdate = async (req, res, next) => {
  try {
    // if (req.user.id === req.body.id) {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.user.update(req.body);
    res.status(204).end();
    // } else {
    //   const err = new Error("Unauthoized");
    //   err.status = 401;
    //   next(err);
    //}
  } catch (error) {
    next(error);
  }
};
