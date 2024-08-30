// routers/movie.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/get-movies', movieController.getMovies);

module.exports = router;