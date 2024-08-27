// routers/movie.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/create',checkAuth, bookingController.Bookings);

module.exports = router;