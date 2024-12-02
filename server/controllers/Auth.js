const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Helper Functions
const isValidEmail = (email) => validator.isEmail(email);
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const findUser = async (query) => await User.findOne(query);

// Sign Up controller
const signUp = async (req, res) => {
  const { email, password, googleUid, name, phoneNumber } = req.body;
  let profilePicture;

  try {
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email. Please log in.',
        userDetails: {
          name: existingUser.name,
          email: existingUser.email,
          GUid: existingUser.googleAccount || "N/A",
        },
      });
    }

    // Profile picture upload handling
    if (req.files?.profilePicture) {
      const uploadedImage = await uploadImageToCloudinary(
        req.files.profilePicture,
        'user_profiles',
        500,
        80
      );
      profilePicture = uploadedImage.secure_url;
    }

    if (googleUid) {
      const newUser = new User({ email, googleUid, name, profilePicture, phoneNumber });
      await newUser.save();
      return res.status(201).json({
        message: 'Google user registered successfully',
        user: newUser,
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, name, profilePicture, phoneNumber });
    await newUser.save();

    const token = generateToken(newUser._id);
    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password, googleUid } = req.body;

  try {
    if (!email && !googleUid) {
      return res.status(400).json({ message: 'Email or Google UID is required' });
    }

    const user = await findUser(googleUid ? { googleUid } : { email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!googleUid) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        googleUid: user.googleUid || 'N/A',
        profilePicture: user.profilePicture || 'N/A',
        phoneNumber: user.phoneNumber || 'N/A',
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle profile picture upload
    if (req.files?.profilePicture) {
      const uploadedImage = await uploadImageToCloudinary(
        req.files.profilePicture,
        'user_profiles',
        500,
        80
      );

      if (uploadedImage && uploadedImage.secure_url) {
        user.profilePicture = uploadedImage.secure_url;
      } else {
        return res.status(500).json({ message: 'Failed to upload profile picture' });
      }
    }

    // Update other fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: 'User profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture || 'N/A',
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Delete Account
const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return res.status(500).json({ message: 'Failed to delete account' });
  }
};

module.exports = {
  signUp,
  login,
  updateProfile,
  deleteAccount,
};