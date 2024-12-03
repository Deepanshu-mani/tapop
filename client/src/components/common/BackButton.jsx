import { Link } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa'; 

const BackButton = () => {
  return (
    <div className="absolute top-6 left-6 flex items-center space-x-2">
      {/* Back Arrow Button */}
      <Link
        to="/"
        className="flex items-center space-x-2 border-2 rounded-full px-3 py-3 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 hover:scale-95 transition-all duration-200 ease-in-out"
      >
        <FaArrowLeft className="w-6 h-6" />
        <span className="font-bold text-3xl">BACK</span>
      </Link>
    </div>
  );
};

export default BackButton;