const express = require('express');
const jwt = require('jsonwebtoken');

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

module.exports = checkAuth;