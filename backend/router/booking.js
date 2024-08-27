// routers/movie.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/create',checkAuth, bookingController.Bookings);
router.get('/booked-seats', bookingController.getBookedSeats);
module.exports = router;