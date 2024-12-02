const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/User');
const database = require('./config/database');
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require('express-fileupload');

dotenv.config();

const app = express();

// Middleware to handle JSON and cookies
app.use(express.json());  // For parsing application/json
app.use(cookieParser());  // For parsing cookies

// Enable CORS for specific origins (security consideration for production)
app.use(
  cors({
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Enable file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/",
  })
);

// Cloudinary Configuration
cloudinaryConnect();

// MongoDB Connection
database.connect();

// Routes
app.use('/api/v1/users', userRoutes);  // User routes for handling user-related actions

// Test Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Server is up and running...',
  });
});

// Error Handling Middleware (Optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack to the console

  // Customize the error response based on the error type
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message || err,  // Provide error message details
  });
});

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log("Gracefully shutting down...");
  
  // Close MongoDB connection gracefully
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }

  process.exit(0);  // Exit the process after database closure
});

// Ensure the MongoDB connection string is available
if (!process.env.MONGODB_URL) {
  console.error("MongoDB connection string is missing in environment variables.");
  process.exit(1);  // Exit if MongoDB URL is not present
}

// Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});