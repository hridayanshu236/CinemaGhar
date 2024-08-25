const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User.js');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(cors());
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(() => {
    console.log('Connection successfull');
}).catch((err) =>{
    console.log('No connection');
})

app.post("/login", (req, res) =>{
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            // Compare the provided password with the hashed password in the database
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

app.post('/signup', (req, res) => {
    console.log('Received signup request');
    const { email, password } = req.body;

    UserModel.findOne({ email })
    .then(existingUser => {
        if (existingUser) {
            console.log('Email already in use');
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password before saving the user
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

// Global error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit the process with an error code
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1); // Exit the process with an error code
});

app.listen(3001, () => {
    console.log("Server is running");
});
