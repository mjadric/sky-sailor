const db = require('./database');
const bcrypt = require('bcrypt');
const { stack } = require('./routes');
const jwt = require('jsonwebtoken');



const getHome = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the API!'
    });
};

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
    const [data] = await db.promise().query(`SELECT * FROM AIRPORT WHERE airport_ID = ${req.params.id}`);

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
  };
};

const addAirport = async (req, res) => {
  try {
    const [data] = await db.promise().query("INSERT INTO AIRPORT SET ?", req.body);

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
  };
};

const getAllPlanes = async (req, res) => {
  try { 
    const [data] = await db.promise().query("SELECT * FROM PLANE");

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        planes: data,
      },
    });
  } catch (err) { 
    return res.status(500).json({
      status: "failed to get all planes",
      message: err.message,
    });
  };
};

const getPlaneById = async (req, res) => {
  try {
    const [data] = await db.promise().query(`SELECT * FROM PLANE WHERE plane_ID = ${req.params.id}`);

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get plane",
        message: "Plane not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        plane: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get plane",
      message: err.message,
    });
  };
};

const addPlane = async (req, res) => {
  try {
    const [data] = await db.promise().query("INSERT INTO PLANE SET ?", req.body);

    res.status(200).json({
      status: "success",
      data: {
        plane: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to add plane",
      message: err.message,
    });
  };
};

const getAllAccounts = async (req, res) => {
  try {
    const [data] = await db.promise().query("SELECT * FROM ACCOUNT");

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        accounts: data,
      },
    });
  } catch (err) { 
    return res.status(500).json({
      status: "failed to get all accounts",
      message: err.message,
    });
  };
};

const getAccountById = async (req, res) => {
  try {
    const [data] = await db.promise().query(`SELECT * FROM ACCOUNT WHERE account_ID = ${req.params.id}`);

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get account",
        message: "Account not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        account: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get account",
      message: err.message,
    });
  };
};

const addAccount = async (req, res) => {
  try {
    const [data] = await db.promise().query("INSERT INTO ACCOUNT SET ?", req.body);

    res.status(200).json({
      status: "success",
      data: {
        account: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to add account",
      message: err.message,
    });
  };
};

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
  };
};

const getFlightById = async (req, res) => {
  try { 
    const [data] = await db.promise().query(`SELECT * FROM FLIGHT WHERE flight_ID = ${req.params.id}`);

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
  };
};

const addFlight = async (req, res) => {
  try {
    const [data] = await db.promise().query("INSERT INTO FLIGHT SET ?", req.body);

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
  };
};

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
    const [data] = await db.promise().query(`SELECT * FROM RESERVATION WHERE reservation_ID = ${req.params.id}`);

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
  };
};

const addReservation = async (req, res) => {
  try {
    const [data] = await db.promise().query("INSERT INTO RESERVATION SET ?", req.body);

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
  };
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
    userSignUp
};