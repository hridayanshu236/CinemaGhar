// routers/movie.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/create',checkAuth, bookingController.Bookings);
router.get('/booked-seats', bookingController.getBookedSeats);
router.get('/booking-details',checkAuth, bookingController.getBookingDetails  );
module.exports = router;