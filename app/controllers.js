const db = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



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

const userSignUp = async (req, res) => {
  try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
          return res.status(400).json({ error: 'All fields are required.' });
      }

      const [existingUser] = await db.promise().query('SELECT * FROM account WHERE email = ?', [email]);
      if (existingUser.length > 0) {
          return res.status(409).json({ error: 'User with that email already exists.' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const accountData = {
          email,
          firstName,
          lastName,
          passwordHash: hashedPassword,
      };

      await db.promise().query('INSERT INTO account SET ?', accountData);

      res.status(201).json({ message: 'User successfully registered.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [results] = await db.promise().query('SELECT * FROM account WHERE email = ?', [email]);
    console.log('Database query results:', results);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid login credentials.' });
    }

    const user = results[0];

    console.log('User data from the database:', user);

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid login credentials.' });
    }

    const token = jwt.sign({ userId: user.email }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
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
    userLogin,
    userSignUp,
    searchFlights
};