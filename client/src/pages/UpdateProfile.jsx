import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Make sure to import Firebase storage if needed
import { updateProfile, updatePhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null); // State for selected photo file
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data on page load
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      setDisplayName(auth.currentUser.displayName || '');
      setPhotoURL(auth.currentUser.photoURL || '');
      setPhoneNumber(auth.currentUser.phoneNumber || '');
      setLoading(false);
    } else {
      navigate('/login');
    }
    console.log(auth.currentUser)
  }, [navigate]);

  
  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // Update profile with new display name and photo URL
      // let photoURLUpdated = photoURL;

      // if (photo) {
      //   const storageRef = ref(storage, `profile_pictures/${photo.name}`);
      //   const uploadTask = uploadBytesResumable(storageRef, photo);

      //   // Wait for the photo to be uploaded and get the download URL
      //   await uploadTask;
      //   photoURLUpdated = await getDownloadURL(storageRef);
      // }

      // Update Firebase user profile with displayName and photoURL
      await updateProfile(user, {
        displayName: displayName
     // photoURL: photoURLUpdated,
      });

      // Update phone number if provided
      if (phoneNumber) {
        // Phone number update logic here
        await updatePhoneNumber(user, 
          
          phoneNumber
          );
      }

    

      alert('Profile updated successfully');
      navigate('/dashboard'); // Navigate to dashboard after update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
    setLoading(false);
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
      <div className="w-full max-w-md p-8 bg-gray-700 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-100 mb-8">Update Profile</h2>

        {/* Display Name */}
        <div className="mb-6">
          <label htmlFor="displayName" className="text-gray-300 text-lg">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-gray-600 text-white focus:outline-none"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="text-gray-300 text-lg">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-gray-600 text-white focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="text-gray-300 text-lg">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-gray-600 text-white focus:outline-none"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-6">
          <label htmlFor="photoURL" className="text-gray-300 text-lg">
            Profile Picture
          </label>
          <input
            id="photoURL"
            type="file"
            onChange={handlePhotoChange}
            className="w-full p-3 mt-2 rounded-xl bg-gray-600 text-white focus:outline-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleUpdateProfile}
            className="py-3 px-8 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;