const db = require("../database");

const getAllAirports = async (req, res) => {
  try {
    const [data] = await db.promise().query("SELECT * FROM AIRPORT");

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        airports: data,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed to get all airports",
      message: err.message,
    });
  }
};

const getAirportById = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM AIRPORT WHERE airport_ID = ${req.params.id}`);

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get airport",
        message: "Airport not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        airport: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get airport",
      message: err.message,
    });
  }
};

const addAirport = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query("INSERT INTO AIRPORT SET ?", req.body);

    res.status(200).json({
      status: "success",
      data: {
        airport: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to add airport",
      message: err.message,
    });
  }
};

module.exports = {
  getAllAirports,
  getAirportById,
  addAirport,
};
