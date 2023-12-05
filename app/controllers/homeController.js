const db = require("../database");

const getHome = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API!",
  });
};

module.exports = {
  getHome,
};
