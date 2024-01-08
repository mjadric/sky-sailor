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


const searchFlights = async (req, res) => {
  const { departureTownId, destinationTownId, departureDate } = req.query;

  if (!departureTownId || !destinationTownId || !departureDate) {
    return res.status(400).json({
      status: "failed",
      message:
        "All parameters (departureTownId, destinationTownId, departureDate) are required.",
    });
  }

  try {
    const [rows, fields] = await db
      .promise()
      .query("CALL flight_search(?, ?, ?)", [
        departureTownId,
        destinationTownId,
        departureDate,
      ]);

    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        flights: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed to search flights",
      message: err.message,
    });
  }
};

module.exports = {
  getAllFlights,
  getFlightById,
  searchFlights,
};
