const mongoose = require('mongoose'); // Import mongoose
const UserModel = require('../models/User');
// const BookingModel = require('../models/Booking');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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

    // Check if email is verified
    if (!user.isVerified) {
      console.log('Email not verified for user:', email);
      return res.status(403).json({ error: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials for user:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    console.log('Token:', token); 

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV, // Ensure it's true in production
      sameSite: process.env.SAME_SITE, 
      maxAge: 3600000 // 1 hour
  });

    console.log('Login successful for user:', email);
    console.log('Token:', token);
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
    secure: process.env.NODE_ENV,
    sameSite: 'None',
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


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth:{
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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
    const newUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
      isVerified: false
    });
    await newUser.save();
    console.log('User created successfully');

    // Generate email verification token
    const emailToken = jwt.sign({ _id: newUser._id }, process.env.SECRET, { expiresIn: '1d' });
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${emailToken}`;

    // Send verification email
    const mailOptions = {
      from: process.env.EMAIL,
      to: newUser.email,
      subject: 'Verify Your Email',
      html: `<h4>Hello,</h4>
             <p>Thanks for registering. Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">Verify Email</a>`
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', newUser.email);

    res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Unable to create user', details: error });
  }
};


// Email verification function
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find user and set as verified
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};
