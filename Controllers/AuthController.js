const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User'); // adjust path if needed


// SIGNUP FUNCTION
const signup = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // secure hash with saltRounds = 10
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // Create a token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User  signed up successfully', user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: 'Error signing up user',
      error: error.message || "Unknown server error",
    });
  }
};

// LOGIN FUNCTION
 const login = async (req, res) => {
  try {
    const { name,email, password,phone,address } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    const errorMsg= 'Invalid credentials';
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token if the credentials are valid
    const token = jwt.sign({ email:user.email,id: user._id },
      process.env.JWT_SECRET,
      JWT_SECRET, { expiresIn: '1h' });

    // Respond with the user data and the token
    res.status(200).json({ message: 'User  logged in successfully', user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: 'Error logging in user',
      error: error.message || "Unknown server error",
    });
  }
};

module.exports = { signup, login };