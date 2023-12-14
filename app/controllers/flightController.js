const db = require("../database");

const getAllFlights = async (req, res) => {
  try {
    const [data] = await db.promise().query("SELECT * FROM FLIGHT");

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        flights: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get all flights",
      message: err.message,
    });
  }
};

const getFlightById = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM FLIGHT WHERE flight_ID = ${req.params.id}`);

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get flight",
        message: "Flight not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        flight: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get flight",
      message: err.message,
    });
  }
};


module.exports = {
  getAllFlights,
  getFlightById,
};
