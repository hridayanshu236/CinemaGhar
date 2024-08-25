const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'});
}

// Function to handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    //Generating a token for each login
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      // Set the token in a cookie
      res.cookie('authToken', token, {
        httpOnly: true, // Helps prevent XSS attacks
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        maxAge: 3600000 // 1 hour in milliseconds
      });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

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
    const token = createToken(user._id)

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ email, password: hashedPassword });

    console.log('User created successfully');
    res.status(201).json({email, token});
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Unable to create user', details: error });
  }
};


