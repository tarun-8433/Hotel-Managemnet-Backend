const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // 👈 Import model

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill all fields.' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save(); // ✅ Save to MongoDB

    res.status(200).json({ message: 'Message saved successfully!' });
  } catch (err) {
    console.error('❌ Contact form error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
