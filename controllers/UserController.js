const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

/**
 * These controller files' names should start with a lower-case letter, not capital letter.
 */

// Database
const { User, List } = require("../db/models");

exports.fetchUser = async (userId, next) => {
  try {
    const users = await User.findByPk(userId);
    return users;
  } catch (error) {
    next(error);
  }
};

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

    // exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// Update
exports.userUpdate = async (req, res, next) => {
  try {
    // you need this if-statement which sets permissions that other users
    // can't update other users' profile info.
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
    // }
  } catch (error) {
    next(error);
  }
};

// Create List
exports.createList = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;

    const newList = await List.create(req.body);

    res.status(201).json(newList);
  } catch (error) {
    next(error);
  }
};

// Write as a comment above the controller function and the route
// that clearly indicates that the user delete API endpoint is only
// used for development, that the app won't actually use it.
// it doesn't matter for this project, you're the only devs
// but it's important to note this for projects in general
// if you're doing something like this.
// Delete
exports.deleteUser = async (req, res, next) => {
  try {
    // delete this commented code since you won't use it.
    // if (req.user.id === req.body.user.id) {
    await req.user.destroy();
    res.status(204).end();
    // } else {
    //   const err = new Error("Unauthoized");
    //   err.status = 401;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};
