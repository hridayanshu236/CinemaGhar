const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');

const authRoutes = require('../router/auth');
const movieRoutes = require('../router/movie');
const bookingRoutes = require('../router/booking');

require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: "https://cinema-ghar-frontend.vercel.app/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies and credentials
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Use routes from auth.js and movie.js
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/booking', bookingRoutes);

// Connect to MongoDB
const DB = process.env.MONGODB_URI;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database Connection successful');
})
.catch((err) => {
    console.error('No connection:', err);
});

// Global error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Export the handler for Vercel
module.exports.handler = serverless(app);
