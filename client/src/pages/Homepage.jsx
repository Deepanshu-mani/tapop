import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/HomePage/Navbar';
import ImageSec from '../components/HomePage/ImageSec';
import { gsap } from 'gsap';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rotateY = ((mouseX - centerX) / centerX) * 15;
      const rotateX = ((mouseY - centerY) / centerY) * -15;

      gsap.to('.image-sec', {
        rotateY,
        rotateX,
        translateZ: 30,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: 'center',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      {/* Fixed Navbar */}
      <div className="pt-10 fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap pt-[8%] items-center">
        {/* Text Section */}
        <div className="flex-1 p-10 text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
            Welcome to <span className="text-gray-300">MyApp</span>
          </h1>
          <p className="text-lg mb-8 text-gray-400">
            Empower your dreams and unlock your full potential. Your journey to success starts here.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
            <button className="px-6 py-3 border border-gray-700 text-gray-400 font-semibold rounded-md shadow-md hover:bg-gray-800 hover:text-white hover:scale-105 transition-transform duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 p-10 image-sec">
          <ImageSec />
        </div>
      </div>
    </div>
  );
};

export default HomePage;