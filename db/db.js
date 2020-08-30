const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "Eman1234", // remove your PW before pushing to github
  database: "pins_db", // and your DB name as well
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
