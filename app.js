const express = require("express");
// cors
const cors = require("cors");

// body
const bodyParser = require("body-parser");

// db
const db = require("./db");

// passport
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Route
const userRoutes = require("./routes/users");
const tripRoutes = require("./routes/trips");
const path = require("path"); // not a route, move it up
const askMeRoutes = require("./routes/askMe");
const listRoutes = require("./routes/list");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/trips", tripRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);
app.use("/askme", askMeRoutes);
app.use("/list", listRoutes);

// Not found path

app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

// Error Handling Middlewae

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || " Internal Server Error");
});

const run = async () => {
  try {
    await db.sync({ alter: true });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
