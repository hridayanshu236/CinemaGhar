
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { login, logout } = require('../controllers/userController');
const jwt = require('jsonwebtoken');

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

// Middleware to check if the user is logged in
const checkAuth = (req, res, next) => {
    const token = req.cookies.authToken;
    console.log('Token received:', token);

    if (!token) {
        console.log('No token found');
        return res.status(401).json({ isLoggedIn: false });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ isLoggedIn: false });
        }

        req.user = decoded;
        next();
    });
};

router.get('/check-status', checkAuth, (req, res) => {
    res.json({ isLoggedIn: true, user: req.user });
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


// Route for user logout
router.post('/logout', logout);

module.exports = router;
