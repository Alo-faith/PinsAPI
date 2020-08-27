const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

// Database
const { User } = require("../db/models");

exports.fetchUsers = async (userId, next) => {
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
      role: newUser.role,

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

  // const post = await post.findOne({ where: { userId: user.id } });

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    role: user.role,
    // postSlug: post ? post.slug : null,

    // exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// Update
exports.userUpdate = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.trip.userId) {
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
