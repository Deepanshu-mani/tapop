import {
    FaSpotify,
    FaYoutube,
    FaTwitter,
    FaPinterest,
    FaShopify,
    FaTiktok,
    FaLinkedin,
    FaSnapchat,
    FaInstagram,
  } from "react-icons/fa";
  
  // Common function to create the icon elements with Tailwind styling and dynamic background color
  const createIcon = (IconComponent, bgColor,iconColor) => (
    <div className={`p-2 ${bgColor} ${iconColor} rounded-full `}>
      <IconComponent size={40} />
    </div>
  );
  
  const iconSets = [
    // First set with light pink background
    [
      createIcon(FaInstagram, "bg-pink-300 text-white "),
      createIcon(FaYoutube, "bg-pink-300 text-white  "),
      createIcon(FaSnapchat, "bg-pink-300 text-white"),
    ],
    // Second set with orange background
    [
      createIcon(FaTwitter, "bg-orange-500"),
      createIcon(FaPinterest, "bg-orange-500"),
      createIcon(FaShopify, "bg-orange-500"),
    ],
    // Third set with white background
    [
      createIcon(FaTiktok, "bg-white"),
      createIcon(FaLinkedin, "bg-white"),
      createIcon(FaSpotify, "bg-white"),
    ],
    // Fourth set with green background
    [
      createIcon(FaSnapchat, "bg-highlight-green"),
      createIcon(FaInstagram, "bg-highlight-green "),
      createIcon(FaYoutube, "bg-highlight-green"),
    ],
  ];
  
  export { iconSets };