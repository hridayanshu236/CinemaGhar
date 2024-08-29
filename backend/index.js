const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./router/auth'); // Adjust path as needed
const movieRoutes = require('./router/movie'); // Ensure this path is correct
const bookingRoutes = require('./router/booking');

require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: "https://cinema-ghar-frontend.vercel.app/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies and credentials
};

// Apply middleware
app.use(cors(corsOptions));
app.use(cookieParser()); // Add cookie parser middleware
app.use(express.json()); // For parsing application/json

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
    process.exit(1); // Exit the process with an error code
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1); // Exit the process with an error code
});

// Start server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
