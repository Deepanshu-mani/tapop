const admin = require('../config/firebase');  // Firebase Admin SDK
const jwt = require('jsonwebtoken');  // JWT library

const authenticate = async (req, res, next) => {
  let token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

  if (!token && req.user && req.user.token) {
    // If no token in header, check if it's available in the user object (for session-based auth)
    token = req.user.token; 
  }

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Firebase token verification
    try {
      // Try verifying the Firebase ID token
      const decoded = await admin.auth().verifyIdToken(token);
      req.userId = decoded.uid;  // Firebase user ID
      console.log('Firebase token verified:', decoded);
      return next(); // Proceed to the next middleware or route handler
    } catch (firebaseError) {
      console.log('Firebase verification failed. Proceeding to regular JWT validation...');
    }

    // Regular JWT verification for custom authentication (MongoDB-based)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify using JWT secret
    req.userId = decoded.userId; // Attach the user ID to the request object
    console.log('JWT token verified:', decoded);
    return next(); // Proceed to the next middleware or route handler

  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;