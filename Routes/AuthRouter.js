const router = require('express').Router();
const UserModel = require('../models/User'); // Assuming this is your user schema
const bcrypt = require('bcrypt'); // Optional: for secure passwords
const jwt = require('jsonwebtoken'); // For JWT token generation
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation'); // Validation middleware
// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    // Optional: hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });

    res.status(201).json({ message: 'User signup successfully', user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Error signup user', error: error.message });
  }
});

// Login Route (with JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with user details (exclude password)
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload
      process.env.JWT_SECRET_KEY, // secret key (store in env file)
      { expiresIn: '1h' } // optional expiration time
    );

    // Respond with the token
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Error login user', error: error.message });
  }
});

module.exports = router;
