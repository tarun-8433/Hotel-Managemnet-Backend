require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const roomRoutes = require('./Routes/roomRoutes'); 
const bookingRoutes = require('./Routes/bookingRoutes'); 
const connectToMongo = require('./db');
const contactRoutes = require('./Routes/contactRoutes'); // contact route
const serviceRoutes = require('./Routes/serviceRoutes'); // service route
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', AuthRouter);     // ✅ Your auth routes
app.use('/api/rooms', roomRoutes);    // ✅ Room routes now properly mounted
app.use('/api/bookings', bookingRoutes); // ✅ Booking routes
app.use('/api/contact', contactRoutes); // contact route
app.use('/api/service', serviceRoutes); // ✅ Mount service route
// Connect to DB, then start server
const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server due to DB error:', err);
  }
};

startServer();
