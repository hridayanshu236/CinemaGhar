const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/authMiddleware')

// Authentication routes
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.get('/verify-email/:token', userController.verifyEmail);

router.get('/check-status', checkAuth, (req, res) => {
    res.json({ isLoggedIn: true, user: req.user });
});

module.exports = router;
