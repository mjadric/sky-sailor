const db = require("../database");

const getAllReservations = async (req, res) => {
  try {
    const [data] = await db.promise().query("SELECT * FROM RESERVATION");

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        reservations: data,
      },
    });
  } catch {
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
  try {
    const [data] = await db
      .promise()
      .query("INSERT INTO RESERVATION SET ?", req.body);

    res.status(200).json({
      status: "success",
      data: {
        reservation: data,
      },
    });
  } catch {
    return res.status(500).json({
      status: "failed to add reservation",
      message: err.message,
    });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  addReservation,
};
