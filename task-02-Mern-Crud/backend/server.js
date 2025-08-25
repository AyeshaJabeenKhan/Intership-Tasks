// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // loads .env into process.env

const app = express();

// --- Middleware ---
// Allow JSON bodies: req.body = parsed object
app.use(express.json());

// Allow frontend (React on 3000) to call this API
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true
}));


// Simple health route to test server quickly
app.get('/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);


// --- DB + Server boot ---
// Read environment values
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI missing in .env');
  process.exit(1);
}

// Connect to DB, then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server listening on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Optional: handle unhandled promise rejections (safety)
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

