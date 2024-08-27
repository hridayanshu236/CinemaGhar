// controllers/bookingController.js
const BookingModel = require('../models/Booking');
const UserModel = require('../models/User');

exports.Bookings = async (req, res) => {
    try {
        const { title, date, time, seats } = req.body;
        const userId = req.user._id; // Get user ID from req.user

        if (!title || !date || !time || !seats || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new booking
        const newBooking = new BookingModel({
            title,
            screenings: [{
                date,
                times: [time],
            }],
            seats,
            user: userId
        });

        // Save the booking
        const savedBooking = await newBooking.save();

        // Update the user's bookings
        await UserModel.findByIdAndUpdate(userId, {
            $push: { bookings: savedBooking._id }
        });

        res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
    } catch (error) {
        console.error('Error creating booking:', error); // Debugging
        res.status(500).json({ error: 'Error creating booking', details: error.message });
    }
};
