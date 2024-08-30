const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bookings' 
    }] 
    // refreshToken: {
    //     type: String, // Store the refresh token here
    //     default: null
    // }
});

// Index the email field to speed up queries
UserSchema.index({ email: 1 });

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
