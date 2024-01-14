const express = require("express");
const jwt = require("jsonwebtoken");


const homeController = require("./controllers/homeController");
const flightController = require("./controllers/flightController");
const accountController = require("./controllers/accountController");
const airportController = require("./controllers/airportController");
const planeController = require("./controllers/planeController");
const reservationController = require("./controllers/reservationController");
const townController = require("./controllers/townController");
const adminFlightController = require("./controllers/adminFlightController");

const router = express.Router();

router.get("/", homeController.getHome);

router.get("/airports", airportController.getAllAirports);
router.get("/airports/:id", airportController.getAirportById);
router.post("/airports", airportController.addAirport);

router.get("/planes", planeController.getAllPlanes);
router.get("/planes/:id", planeController.getPlaneById);
router.post("/planes", planeController.addPlane);

router.get("/accounts", accountController.getAllAccounts);
router.get("/accounts/:id", accountController.getAccountById);
router.post("/accounts", accountController.addAccount);
router.post("/login", accountController.login);
router.post("/signup", accountController.userSignUp);

router.get("/flights", flightController.getAllFlights);
router.get("/flights/:id", flightController.getFlightById);

router.get("/reservations", reservationController.getAllReservations);
router.get("/reservations/:id", reservationController.getReservationById);
router.post("/reservations", reservationController.addReservation);
router.get("/flightclasses", reservationController.getAllFlightClasses);
router.get("/seat", reservationController.getFirstAvailableSeat);

router.get("/towns", townController.getTownsByName);

router.get("/search", flightController.searchFlights);

router.post("/flights", adminFlightController.addFlight);
router.patch("/flights/:id", adminFlightController.updateFlight);
router.delete("/flights/:id", adminFlightController.deleteFlight);

const authenticateToken = async (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
  
    if (!tokenHeader) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = tokenHeader.split(' ')[1];
  
    console.log('Received Token:', token);
  
    try {
      const user = await jwt.verify(token, 'shared_secret_key');
      req.user = user;
      next();
    } catch (err) {
      console.error('JWT Verification Error:', err);
      return res.status(403).json({ success: false, error: 'Forbidden: Invalid token' });
    }
  };

  
  router.get("/account", authenticateToken, accountController.getAccount);

module.exports = router;
