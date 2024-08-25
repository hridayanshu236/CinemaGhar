const express = require('express');
const router = express.Router();
const UserModel = require('../models/User.js'); // Adjust path as needed
const bcrypt = require('bcrypt');

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
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            res.json("Success");
                        } else {
                            res.json("Password is incorrect");
                        }
                    });
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).json({ error: "Server error" });
        });
});

router.post('/signup', (req, res) => {
    console.log('Received signup request');
    const { email, password } = req.body;

    UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                console.log('Email already in use');
                return res.status(400).json({ error: "Email already in use" });
            }

            bcrypt.hash(password, 10)
                .then(hash => {
                    return UserModel.create({ email, password: hash });
                })
                .then(newUser => {
                    console.log('User created successfully');
                    res.status(201).json(newUser);
                });
        })
        .catch(err => {
            console.error('Error during signup:', err);
            res.status(500).json({ error: "Unable to create user", details: err });
        });
});

module.exports = router;
