const express = require('express');
const { signUp, login, updateProfile,deleteAccount } = require('../controllers/Auth');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/signup', signUp); // Handle user signup
router.post('/login', login); // Handle user login

// Protected routes
router.put('/profile/:userId', authenticate, updateProfile); // Update user profile


module.exports = router;