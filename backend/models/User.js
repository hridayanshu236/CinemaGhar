const mongoose = require('mongoose')

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
    // refreshToken: {
    //     type: String, // Store the refresh token here
    //     default: null
    // }
});

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel