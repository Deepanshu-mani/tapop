import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { QRCodeCanvas } from 'qrcode.react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error("Sign-out error:", err.message);
    }
  };

 

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-800 flex-col justify-center items-center py-12">
      {user ? (
        <div className="w-full max-w-xl p-10 rounded-3xl shadow-2xl border-gray-300 backdrop-blur-3xl bg-gray-700/20">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={user.photoURL || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-gray-200 shadow-lg"
            />
            <h2 className="text-3xl font-semibold text-gray-100 mt-6">
              {user.displayName || 'No Name'}
            </h2>
            <p className="text-gray-300 text-lg">{user.email}</p>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center mt-6">
            <QRCodeCanvas
              value={`https://hello-seven-ochre.vercel.app/index.html?name=${user.displayName || 'Guest'}`}
              size={180}
              bgColor="transparent"
              fgColor="#ffffff"
              level="H"
              className="shadow-lg rounded-lg"
            />
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center gap-4 cursor-pointer mt-10">
            <button
              onClick={handleSignOut}
              className="py-3 w-full px-8  bg-red-600 text-white text-lg font-medium rounded-3xl hover:bg-red-700 shadow-gray-700 shadow-lg hover:scale-95 transition-transform duration-300"
            >
              Sign Out
            </button>
            <button
              onClick={() => navigate('/profile')}
              className=" py-3 w-full px-8 border text-white text-lg font-medium rounded-3xl shadow-gray-700 shadow-lg hover:scale-95 hover:bg-gray-800 transition-transform duration-300"
            >
              Update Profile
            </button>
          </div>

        </div>
      ) : (
        <p className="text-gray-300">No user found</p>
      )}
    </div>
  );
};

export default Dashboard;