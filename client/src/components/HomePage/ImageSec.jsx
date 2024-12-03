import React, { useState, useEffect } from 'react';
import { avatarArray, bgArray, itemArray, widgetArray } from '../../utils/imagesArray';
import { iconSets } from '../../utils/icons';
import { titles } from '../../utils/titles'; // Import titles from the titles.js file


function ImageSec() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIconSet, setCurrentIconSet] = useState(0);

  useEffect(() => {
    // Trigger the first animation after mounting
    setTimeout(() => {
      triggerTransition();
    }, 100);
    const interval = setInterval(() => {
      triggerTransition();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

 const triggerTransition = () => {
  setIsTransitioning(true);

  // Temporarily hide elements
  const elements = document.querySelectorAll('.widget, .item, .icon');
  elements.forEach((el) => el.style.opacity = '0');

  // Change image and icon set halfway through the animation
  setTimeout(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % avatarArray.length);
    setCurrentIconSet((prevSet) => (prevSet + 1) % iconSets.length);
  }, 400);

  // Trigger pop-in animation for widget, item, and icons
  setTimeout(() => {
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.classList.add('pop-in');
    });

    // Remove pop-in class after animation ends
    setTimeout(() => {
      elements.forEach((el) => el.classList.remove('pop-in'));
    }, 400);
  }, 400); // Start pop-in after rotation completes

  setTimeout(() => {
    setIsTransitioning(false);
  }, 800);
};

  const handleClick = () => {
    if (!isTransitioning) triggerTransition();
  };

  return (
    <div className="pl-10 mt-14">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div
          className={`relative ${isTransitioning ? 'animate-horizontal-rotation' : ''}`}
          onClick={handleClick}
        >
          <div className="relative w-full cursor-pointer">
            {/* Item Image */}
            <div className="item absolute top-8 -right-[15rem] z-0 item">
              <img
                src={itemArray[currentIndex]}
                alt={`Item ${currentIndex + 1}`}
                className="h-[60%] w-[60%] object-contain"
              />
            </div>
            {/* Background Image */}
            <img
              src={bgArray[currentIndex]}
              alt={`Background ${currentIndex + 1}`}
              className="bgimg w-[80%] object-cover rounded-lg z-10 relative"
            />
            {/* Avatar Image */}
            <div className="absolute top-20 left-36 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <img
                src={avatarArray[currentIndex]}
                alt={`Avatar ${currentIndex + 1}`}
                className="w-28 h-28 rounded-full object-cover border-4 border-white"
              />
            </div>
            {/* Title and Icon Set */}
            <div className="absolute w-[74%] top-[12rem] right-[5.2rem] z-20 text-center flex flex-col items-center space-y-4 py-4">
              {titles[currentIconSet].text.split(', ').map((title, index) => (
                <h3
                  key={index}
                  className={`w-full text-sm px-3 py-5 ${titles[currentIconSet].bgClass} rounded-full`}
                >
                  {title}
                </h3>
              ))}
            </div>
            {/* Widget Image */}
            <div className="widget absolute bottom-[3rem] -left-[8rem] z-20 widget">
              <img
                src={widgetArray[currentIndex]}
                alt={`Widget ${currentIndex + 1}`}
                className="w-[68%] object-contain rounded-lg"
              />
            </div>
            {/* Icon Set */}
            <div className="icon absolute bottom-[7rem] -right-16 flex z-10 gap-2">
              {iconSets[currentIconSet].map((icon, index) => (
                <div key={index} className="p-2 rounded-full text-black text-3xl">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSec;