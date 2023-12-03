const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/', controllers.getHome);

router.get('/airports', controllers.getAllAirports);
router.get('/airports/:id', controllers.getAirportById);
router.post('/airports', controllers.addAirport);

router.get('/planes', controllers.getAllPlanes);
router.get('/planes/:id', controllers.getPlaneById);
router.post('/planes', controllers.addPlane);

router.get('/accounts', controllers.getAllAccounts);
router.get('/accounts/:id', controllers.getAccountById);
router.post('/accounts', controllers.addAccount);

router.get('/flights', controllers.getAllFlights);
router.get('/flights/:id', controllers.getFlightById);
router.post('/flights', controllers.addFlight);

router.get('/reservations', controllers.getAllReservations);
router.get('/reservations/:id', controllers.getReservationById);
router.post('/reservations', controllers.addReservation);

module.exports = router;