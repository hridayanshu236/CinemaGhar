const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public routes
router.get('/', (req, res) => {
    res.send('Welcome to the API');
});

router.get('/about', (req, res) => {
    res.send('About page');
});

router.get('/movies', (req, res) => {
    res.send('Movies page');
});

router.get('/rates', (req, res) => {
    res.send('Rates page');
});

router.get('/signup', (req, res) => {
    res.send('Signup page');
});

// Authentication routes
router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;
