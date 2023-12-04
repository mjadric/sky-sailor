const db = require('./database');

const getHome = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the API!'
    });
};

const getAllAirports = (req, res) => {
    db.query('SELECT * FROM AIRPORT', (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get all airports',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
          airports: data,
        },
      });
    });
};

const getAirportById = (req, res) => {
    db.query(`SELECT * FROM AIRPORT WHERE airport_ID = ${req.params.id}`, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get airport',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          airport: data,
        },
      });
    });
};

const addAirport = (req, res) => {
    db.query('INSERT INTO AIRPORT SET ?', req.body, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to add airport',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          airport: data,
        },
      });
    });
};

const getAllPlanes = (req, res) => {
    db.query('SELECT * FROM PLANE', (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get all planes',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
          planes: data,
        },
      });
    });
};

const getPlaneById = (req, res) => {
    db.query(`SELECT * FROM PLANE WHERE plane_ID = ${req.params.id}`, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get plane',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          plane: data,
        },
      });
    });
};

const addPlane = (req, res) => {
    db.query('INSERT INTO PLANE SET ?', req.body, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to add plane',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          plane: data,
        },
      });
    });
};

const getAllAccounts = (req, res) => {
    db.query('SELECT * FROM ACCOUNT', (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get all accounts',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
          accounts: data,
        },
      });
    });
};

const getAccountById = (req, res) => {
    db.query(`SELECT * FROM ACCOUNT WHERE account_ID = ${req.params.id}`, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get account',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          account: data,
        },
      });
    });
};

const addAccount = (req, res) => {
    db.query('INSERT INTO ACCOUNT SET ?', req.body, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to add account',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          account: data,
        },
      });
    });
};

const getAllFlights = (req, res) => {
    db.query('SELECT * FROM FLIGHT', (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get all flights',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
          flights: data,
        },
      });
    });
};

const getFlightById = (req, res) => {
    db.query(`SELECT * FROM FLIGHT WHERE flight_ID = ${req.params.id}`, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get flight',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          flight: data,
        },
      });
    });
};

const addFlight = (req, res) => {
    db.query('INSERT INTO FLIGHT SET ?', req.body, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to add flight',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          flight: data,
        },
      });
    });
};

const getAllReservations = (req, res) => {
    db.query('SELECT * FROM RESERVATION', (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get all reservations',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
          reservations: data,
        },
      });
    });
};

const getReservationById = (req, res) => {
    db.query(`SELECT * FROM RESERVATION WHERE reservation_ID = ${req.params.id}`, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to get reservation',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          reservation: data,
        },
      });
    });
};

const addReservation = (req, res) => {
    db.query('INSERT INTO RESERVATION SET ?', req.body, (err, data) => {
      if (err) {
        return res.status(404).json({
          status: 'failed to add reservation',
          message: err.message,
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          reservation: data,
        },
      });
    });
};

const searchFlights = (req, res) => {
  const { departureTownId, destinationTownId, departureDate, returnDate } = req.query;

  if (!departureTownId || !destinationTownId || !departureDate || !returnDate) {
    return res.status(400).json({
      status: "failed",
      message:
        "All parameters (departureTownId, destinationTownId, departureDate, returnDate) are required.",
    });
  }

  db.query(
    'SELECT * FROM flight AS f ' +
    'JOIN airport AS a ON f.departureAirport_ID = a.airport_ID ' +
    'JOIN town AS t ON a.town_id = t.town_ID ' +
    'WHERE ' +
    ' f.departureAirport_ID = ? ' +
    ' AND f.destinationAirport_ID = ? ' + 
    ' AND DATE(f.departureTimeDate) = ? '+ 
    ' AND DATE(f.arrivalTimeDate)0 = ? ',
    [departureTownId, destinationTownId, departureDate, returnDate],
    (err, data) => {
      if (err) {
        return res.status(500).json({
          status: "failed to search flights",
          message: err.message,
        });
      }
      res.status(200).json({
        status: "success",
        results: data.length,
        data: {
          flights: data,
        },
      });
    }
  );
};

module.exports = {
    getHome,
    getAllAirports,
    getAirportById,
    addAirport,
    getAllPlanes,
    getPlaneById,
    addPlane,
    getAllAccounts,
    getAccountById,
    addAccount,
    getAllFlights,
    getFlightById,
    addFlight,
    getAllReservations,
    getReservationById,
    addReservation,
    searchFlights
};