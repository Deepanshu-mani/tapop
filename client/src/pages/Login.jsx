import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../firebase';
import image from '../assets/images/banner-login.png';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setError(''); // Clear error on success
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      setError(''); // Clear error on success
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Section (Form) */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center px-6 py-12 bg-white">
      <BackButton/>
        <div className="px-20 w-full mx-auto">
          <h2 className="text-gray-800 text-4xl font-bold mb-8 text-center">Welcome Back!</h2>
          <form onSubmit={handleLogin}>
            <div className="relative mb-6">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 peer"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-6 text-gray-500 text-md transition-all duration-200 transform peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-500"
              >
                Email
              </label>
            </div>

            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 peer"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-6 text-gray-500 text-md transition-all duration-200 transform peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-500"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:transition-all ease-in-out duration-200 hover:scale-95"
            >
              Log In
            </button>
          </form>

          <p className="text-gray-500 my-4 text-center">OR</p>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 px-4 text-gray-800 font-bold rounded-full border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 mb-4 hover:transition-all ease-in-out duration-200 hover:scale-95"
          >
            <FcGoogle className="text-2xl mr-2" />
            <span>Log in with Google</span>
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')} // Navigate to the Sign Up page
                className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-all duration-200"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full lg:w-[52%]">
        <img
          src={image}
          alt="Login Banner"
          className="w-full h-auto max-h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;