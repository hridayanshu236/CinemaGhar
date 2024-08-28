// controllers/bookingController.js
const BookingModel = require('../models/Booking');
const UserModel = require('../models/User');

exports.Bookings = async (req, res) => {
    try {
        console.log('Received Query Parameters:', req.query);
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

exports.getBookingDetails = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch user data with populated bookings
        const user = await UserModel.findById(userId)
            .populate({
                path: 'bookings',
                // No need to populate screenings here
                // The booking details are already embedded
            })
            .select('email bookings'); // Select only the fields you need

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ 
            email: user.email,
            bookings: user.bookings // Includes details of movie, date, time, and seats
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getBookedSeats = async (req, res) => {
    try {
        console.log('Received Query Parameters:', req.query);
        const { title, date, time } = req.query;

        if (!title || !date || !time) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }

        // Finding all the bookings
        const bookings = await BookingModel.find({
            title,
            'screenings.date': date,
            'screenings.times': time
        });
        console.log('Retrieved Bookings:', bookings);

        // Extracting the booked seats
        const bookedSeats = bookings.reduce((acc, booking) => {
            return acc.concat(booking.seats);
        }, []);
        console.log('Booked Seats:', bookedSeats); // Log the accumulated booked seats

        res.status(200).json({ bookedSeats });
    } catch (error) {
        console.error('Error fetching booked seats:', error);
        res.status(500).json({ error: 'Error fetching booked seats' });
    }
};
