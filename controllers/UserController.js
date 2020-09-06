const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

// Database
const { User, List, Trip } = require("../db/models");

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
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    const defultList = await List.create({
      userId: payload.id,
      title: "Want To Go",
      defaultList: true,
    });

    res.status(201).json({ token, defultList });
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
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// Update user profile
exports.userUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req._user.id) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      await req.user.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Delete user used only in BE
exports.deleteUser = async (req, res, next) => {
  try {
    await req._user.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Create Trip
exports.tripCreate = async (req, res, next) => {
  try {
    if (req.user.id === req._user.id) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      req.body.userId = req.user.id;
      const newTrip = await Trip.create(req.body);
      res.status(201).json(newTrip);
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Create user list
exports.createList = async (req, res, next) => {
  try {
    if (req.user.id === req._user.id) {
      req.body.userId = req.user.id;
      const newList = await List.create(req.body);
      res.status(201).json(newList);
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
