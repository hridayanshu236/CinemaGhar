const UserModel = require('../models/User');
// const BookingModel = require('../models/Booking');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'});
}

// Function to handle user login
exports.login = async (req, res) => {
  const startTime = Date.now();
  console.log('Login function started');

  try {
      const { email, password } = req.body;
      console.log('Login request received:', email);

      const user = await UserModel.findOne({ email });
      if (!user) {
          console.log('No user found with this email:', email);
          return res.status(404).json({ error: 'No user found with this email' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log('Invalid credentials for user:', email);
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = createToken(user._id);

      res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600000 // 1 hour
      });

      console.log('Login successful for user:', email);
      res.json({ message: 'Success', token });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Server error' });
  } finally {
      const endTime = Date.now();
      console.log(`Login function execution time: ${endTime - startTime}ms`);
  }
};
exports.logout = (req, res) => {
  res.cookie('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0) // Set expiry date to past
  });

  res.json({ message: 'Logged out successfully' });
};

//Function to handle booking
// exports.signup = async(req,res) =>{
//   const {userId, movieTitle, date, time, seats} = req.body;
//   // Create a new booking
//   const newBooking = new BookingModel({
//     user: userId,
//     movieTitle,
//     date,
//     time,
//     seats
// });
// await newBooking.save();
// }


// Function to handle user signup
exports.signup = async (req, res) => {
  try {
    console.log('Received signup request');
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.log('Email already in use');
      return res.status(400).json({ error: 'Email already in use' });
    }
    //Generate a token

    // const token = createToken(user._id)

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      _id: new mongoose.Types.ObjectId(), 
      email, password: hashedPassword });

    console.log('User created successfully');
    res.status(201).json({email});
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Unable to create user', details: error });
  }
};


