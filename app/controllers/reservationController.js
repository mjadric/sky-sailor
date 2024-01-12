const db = require("../database");

const getAllReservations = async (req, res) => {
  try {
    const [data] = await db.promise().query("SELECT * FROM RESERVATION");

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get all reservations",
        message: "No reservations found",
      });
    }

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        reservations: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get all reservations",
      message: err.message,
    });
  }
};

const getReservationById = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query(
        `SELECT * FROM RESERVATION WHERE reservation_ID = ${req.params.id}`
      );

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get reservation",
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        reservation: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get reservation",
      message: err.message,
    });
  }
};

const addReservation = async (req, res) => {
  const { flightId, accountId, seatId, extraBaggage, flightInsurance } =
    req.body;

  if (
    typeof flightId !== "number" ||
    flightId <= 0 ||
    typeof accountId !== "number" ||
    accountId <= 0 ||
    typeof seatId !== "number" ||
    seatId <= 0 ||
    typeof extraBaggage !== "number" ||
    (extraBaggage !== 0 && extraBaggage !== 1) ||
    typeof flightInsurance !== "number" ||
    (flightInsurance !== 0 && flightInsurance !== 1)
  ) {
    return res.status(400).json({
      status: "failed to add reservation",
      message: "Invalid reservation data",
    });
  }

  try {
    const [data] = await db
      .promise()
      .query("CALL add_reservation (?, ?, ?, ?, ?)", [
        flightId,
        accountId,
        seatId,
        extraBaggage,
        flightInsurance,
      ]);

    res.status(200).json({
      status: "success",
      data: {
        reservation: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to add reservation",
      message: err.message,
    });
  }
};

const getAllFlightClasses = async (req, res) => {
  const { flightId } = req.query;

  if (!flightId || typeof +flightId !== "number" || +flightId <= 0) {
    return res.status(400).json({
      status: "failed to get flight classes",
      message: "Invalid flight ID",
    });
  }

  try {
    const [data] = await db
      .promise()
      .query("CALL get_flight_classes(?)", [flightId]);

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get flight classes",
        message: "No flight classes found",
      });
    }

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        flightClasses: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get flight classes",
      message: err.message,
    });
  }
};

const getFirstAvailableSeat = async (req, res) => {
  const { flightId, classId } = req.query;

  try {

    const [data] = await db
      .promise()
      .query("CALL get_seat_for_reservation(?, ?, @selectedSeatId)", [flightId, classId]);

    const [selectedSeat] = await db
      .promise()
      .query("SELECT @selectedSeatId AS selectedSeatId");

    const seatId = selectedSeat[0].selectedSeatId;

    res.status(200).json({
      status: "success",
      seatId
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get first available seat for selected class",
      message: err.message,
    });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  addReservation,
  getAllFlightClasses,
  getFirstAvailableSeat,
};
