const db = require("../database");

const addFlight = async (req, res) => {
  const {
    departureTimeDate,
    arrivalTimeDate,
    timeZone,
    plane_ID,
    departureAirport_ID,
    destinationAirport_ID,
    extraBaggagePrice,
    flightInsurancePrice,
    timezone_ID,
    arrivalTimeZone_ID,
    departureTimeZone_ID,
  } = req.body;
  const today = new Date();
  const departureDate = new Date(departureTimeDate);
  const arrivalDate = new Date(arrivalTimeDate);
  if (
    departureDate < today ||
    arrivalDate < today ||
    typeof departureDate !== "object" ||
    typeof arrivalDate !== "object" ||
    typeof timeZone !== "string" ||
    timeZone <= 0 ||
    typeof plane_ID !== "number" ||
    plane_ID <= 0 ||
    typeof departureAirport_ID !== "number" ||
    departureAirport_ID <= 0 ||
    typeof destinationAirport_ID !== "number" ||
    destinationAirport_ID <= 0 ||
    typeof extraBaggagePrice !== "number" ||
    extraBaggagePrice < 0 ||
    extraBaggagePrice > 99.99 ||
    typeof flightInsurancePrice !== "number" ||
    flightInsurancePrice < 0 ||
    flightInsurancePrice > 99.99 ||
    typeof timezone_ID !== "number" ||
    timezone_ID <= 0 ||
    typeof arrivalTimeZone_ID !== "number" ||
    arrivalTimeZone_ID <= 0 ||
    typeof departureTimeZone_ID !== "number" ||
    departureTimeZone_ID <= 0
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid insert flight",
    });
  }
  try {
    const [data] = await db
      .promise()
      .query("INSERT INTO FLIGHT SET ?", req.body);

    res.status(200).json({
      status: "success",
      data: {
        flight: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to add flight",
      message: err.message,
    });
  }
};

const updateFlight = async (req, res) => {
  const {
    departureTimeDate,
    arrivalTimeDate,
    extraBaggagePrice,
    flightInsurancePrice,
  } = req.body;

  if (
    !departureTimeDate &&
    !arrivalTimeDate &&
    !extraBaggagePrice &&
    !flightInsurancePrice
  ) {
    return res.status(400).json({
      status: "failed",
      message:
        "All parameters are required (departureTimeDate, arrivalTimeDate, extraBaggagePrice, flightInsurancePrice).",
    });
  }

  const today = new Date();
  const departureDate = new Date(departureTimeDate);
  const arrivalDate = new Date(arrivalTimeDate);

  if (
    typeof departureDate !== "object" ||
    typeof arrivalDate !== "object" ||
    departureDate < today ||
    arrivalDate < today
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid departure and arrival dates",
    });
  }

  if (
    typeof extraBaggagePrice !== "number" ||
    extraBaggagePrice < 0 ||
    extraBaggagePrice > 99.99 ||
    typeof flightInsurancePrice !== "number" ||
    flightInsurancePrice < 0 ||
    flightInsurancePrice > 99.99
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid extra baggage price or flight insurance price",
    });
  }

  try {
    const updateData = {};
    if (departureTimeDate) updateData.departureTimeDate = departureTimeDate;
    if (arrivalTimeDate) updateData.arrivalTimeDate = arrivalTimeDate;
    if (extraBaggagePrice) updateData.extraBaggagePrice = extraBaggagePrice;
    if (flightInsurancePrice)
      updateData.flightInsurancePrice = flightInsurancePrice;

    const [data] = await db
      .promise()
      .query(`UPDATE FLIGHT SET ? WHERE flight_ID = ${req.params.id}`, [
        updateData,
      ]);

    if (data.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Flight not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        flight: {
          ...updateData,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to update flight",
      message: err.message,
    });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query(`DELETE FROM FLIGHT WHERE flight_ID = ${req.params.id}`);

    if (data.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Flight not found.",
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
      status: "failed to delete flight",
      message: err.message,
    });
  }
};

module.exports = {
  addFlight,
  updateFlight,
  deleteFlight,
};
