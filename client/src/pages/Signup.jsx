import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from '../firebase';
import image from '../assets/images/banner-register.png';
import { FcGoogle } from "react-icons/fc";
import BackButton from '../components/common/BackButton';
import axios from 'axios';

// Reusable input component
const InputField = ({ id, label, type, value, onChange, required, placeholder, className }) => (
  <div className="relative mb-6">
    <input
      aria-label={`Enter your ${label}`}
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full mt-2 px-4 py-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 peer ${className}`}
      placeholder={placeholder}
      required={required}
    />
    <label
      htmlFor={id}
      className="absolute left-4 top-6 text-gray-500 text-md transition-all duration-200 transform peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-500"
    >
      {label}
    </label>
  </div>
);

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const navigate = useNavigate();

  // Handle image upload to Cloudinary
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.size < 5 * 1024 * 1024) { // Limit size to 5MB
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  //     formData.append('folder', 'user_profiles');
  //     try {
  //       const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
  //       setProfilePhoto(res.data.secure_url); // Set the Cloudinary URL of the uploaded image
  //     } catch (err) {
  //       console.error('Error uploading image:', err);
  //       setError('Image upload failed. Please try again.');
  //     }
  //   } else {
  //     setError('File is too large. Please upload a file smaller than 5MB.');
  //   }
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('No file selected. Please upload an image.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // Limit size to 5MB
      setError('File is too large. Please upload a file smaller than 5MB.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "profilepreset");
    formData.append('folder', 'user_profiles');
  
    try {
      // setIsUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dkhpak024/image/upload`, 
        formData
      );
      setProfilePhoto(res.data.secure_url); // Set the Cloudinary URL of the uploaded image
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Image upload failed. Please try again.';
      console.error('Error uploading image:', errorMessage);
      setError(errorMessage);
    } finally {
      console.log('Image upload complete');
      // setIsUploading(false);
    }
  };
  



  // Validate input fields
  const validateInputs = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid phone number (10 digits).');
      return false;
    }
    return true;
  };

  // Handle sign-up with email and password
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);

      // Send user data to backend (MongoDB)
      const response = await axios.post('http://localhost:4000/api/v1/users/signup', {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        profilePhoto: profilePhoto || '', // Send empty string if no photo
      });
      console.log(response);
      if (response.status === 201) {
        console.log('User created in MongoDB:', response.data);
        setError('');
        navigate('/login');
      } else {
        setError(response.data.message || 'Error occurred');
      }
    } catch (err) {
      setError('An error occurred during sign-up.');
      console.error('Error signing up:', err);
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in method
  const handleGoogleSignIn = async () => {
    setLoading(true);
  
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google user:', result.user);
  
      // Send Google user data to backend (MongoDB)
      const response = await fetch('http://localhost:4000/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          googleUid: result.user.uid,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Google user created in MongoDB:', data);
        setError('');
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Error occurred');
      }
    } catch (err) {
      setError(err.message);
      console.error('Google Sign-In Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form validity
  const handleInputChange = () => {
    setIsFormValid(
      email && password && name && phoneNumber
    );
    
  };
  

  return (
    <div className="flex min-h-screen">
      {/* Left Section (Form) */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center px-6 py-12 bg-white h-screen">
        <BackButton />
        <div className="px-20 w-full mx-auto">
          <p className="text-gray-800 text-4xl font-bold mb-8 text-center">Sign up for free!</p>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSignup}>
            {/* Name Input */}
            <InputField
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); handleInputChange(); }}
              required
            />

            {/* Phone Number Input */}
            <InputField
              id="phoneNumber"
              label="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => { setPhoneNumber(e.target.value); handleInputChange(); }}
              required
            />

            {/* Profile Photo Input */}
            <div className="relative mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full mt-2 px-4 py-3 pl-[59%] cursor-pointer bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <label
                htmlFor="profilePhoto"
                className="absolute left-4 top-6 text-gray-500 text-md transition-all duration-200 transform peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-500"
              >
                Profile Photo
              </label>
            </div>

            {/* Email Input */}
            <InputField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); handleInputChange(); }}
              required
            />

            {/* Password Input */}
            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); handleInputChange(); }}
              required
            />

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full py-3 px-4 bg-purple-600 text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:shadow-lg hover:transition-all ease-in-out duration-200 hover:scale-95"
            >
              {loading ? 'Signing up...' : 'Continue'}
            </button>
          </form>

          <p className="text-gray-500 my-4 text-center">OR</p>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center w-full py-3 px-4 bg-white text-black font-bold rounded-full border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:shadow-lg hover:scale-95 transition-all"
          >
            <FcGoogle className="text-2xl mr-4" />
            Continue with Google
          </button>

          <div className="mt-4 text-center">
  <p className="text-sm text-gray-500">
    Already have an account?{' '}
    <Link to="/login" className="text-purple-600 hover:text-purple-800 cursor-pointer">
      Log in
    </Link>
  </p>
</div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden lg:flex w-[52%] bg-purple-500 justify-center items-center h-screen">
        <img src={image} alt="Signup" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default Signup;