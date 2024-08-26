const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    posterUrl: { 
        type: String 
    }, // URL to the movie's poster image
    screenings: [{ 
        date: { type: String, required: true },
        times: [{ type: String, required: true }],
    }],
    seats: [{
        type: String, // e.g., "A1", "B2"
        required: true,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const BookingModel = mongoose.model('Bookings', BookingSchema);
module.exports = BookingModel;
