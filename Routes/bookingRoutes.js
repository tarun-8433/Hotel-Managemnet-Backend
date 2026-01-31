const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Import Booking model

// POST route for creating a booking
router.post('/', async (req, res) => {
  const { name, checkIn, checkOut, roomId, price, image, userId } = req.body;

  try {
    const newBooking = new Booking({
      name,
      checkIn,
      checkOut,
      roomId,
      price,
      image,
      userId,
    });

    // Save booking to the database
    await newBooking.save();
    res.status(200).json({ message: 'Booking successful!', booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed, please try again.' });
  }
});

module.exports = router;
