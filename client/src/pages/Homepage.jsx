import React, { useEffect } from 'react';
import Navbar from '../components/HomePage/Navbar';
import ImageSec from '../components/HomePage/ImageSec';
import { gsap } from 'gsap';

const HomePage = () => {
  useEffect(() => {
    // Function to track mouse movement
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate offsets for 3D rotation and translation
      const rotateY = ((mouseX - centerX) / centerX) * 15; // Rotate horizontally
      const rotateX = ((mouseY - centerY) / centerY) * -15; // Rotate vertically
      const translateZ = 30; // Pop out slightly

      // Apply 3D transformation to ImageSec
      gsap.to('.image-sec', {
        rotateY, // Horizontal tilt
        rotateX, // Vertical tilt
        translateZ, // Depth effect
        duration: 0.3, // Smooth transition
        ease: 'power2.out', // Smooth easing
        transformPerspective: 1000, // Add perspective for 3D effect
        transformOrigin: 'center', // Transform around the center
      });
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen text-white perspective-1000">
      <div className="pt-10">
        <Navbar />
      </div>
      <div className="flex">
        {/* Text Section */}
        <div className="text-center p-10 w-[50%]">
          <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>
          <p className="text-lg">Your journey to success starts here.</p>
        </div>

        {/* Image Section */}
        <div className="p-10 w-[50%]">
          {/* Add a specific class to target only ImageSec */}
          <div className="image-sec">
            <ImageSec />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;