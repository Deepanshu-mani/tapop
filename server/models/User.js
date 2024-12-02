const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { trim } = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    phoneNumber: {
      type: Number,
      required: false, // Optional as phone is not mandatory in all cases
    },
    profilePicture: {
      type: String,
      required: false, // Optional, will be used if the user uploads a profile picture
    },
    password: {
      type: String,
      required: false, // Only required for custom email signup, not for Google
      minlength: 6, 
      trim:false,
    },
    googleAccount: {
      type: Boolean,
      default: false, // Flag to indicate if the user signed up using Google
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);




const User = mongoose.model('User', userSchema);

module.exports = User;