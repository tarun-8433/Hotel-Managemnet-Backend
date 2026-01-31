const express = require('express');
const router = express.Router();

// (Optional) Add DB model if you want to save services
router.post('/', async (req, res) => {
  const { service } = req.body;

  if (!service) {
    return res.status(400).json({ error: 'Service not provided' });
  }

  console.log('📦 Service Selected:', service);
  res.status(200).json({ message: 'Service request received', service });
});

module.exports = router;
